import React, { useState, useEffect } from 'react';
import { getNews, createNews, updateNews } from '../services/cmsService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ImageIcon, Newspaper, FileText, Tag, RefreshCw, PlusCircle, Edit, AlertCircle, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import shadcn components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

// This would normally come from a proper auth system
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'rashmi2024' // In a real app, you would NEVER hardcode passwords
};

const NewsAdmin = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authFormData, setAuthFormData] = useState({
    username: '',
    password: ''
  });
  
  // Form state
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Achievement',
    excerpt: '',
    content: '',
    image: null as File | null
  });
  
  const categories = ['Achievement', 'Expansion', 'Award', 'Sustainability'];
  
  // Check if user has a valid session on component mount
  useEffect(() => {
    // In a real app, this would verify a token with the server
    const adminToken = localStorage.getItem('rashmi_admin_token');
    if (adminToken) {
      // Validate token with an API call in a real application
      setIsAuthenticated(true);
      fetchNews();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchNews = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const newsData = await getNews();
      setNews(newsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please check your Strapi connection.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating server auth - in a real app, this would be an API call
    setTimeout(() => {
      if (
        authFormData.username === ADMIN_CREDENTIALS.username && 
        authFormData.password === ADMIN_CREDENTIALS.password
      ) {
        // In a real app, the server would return a token
        localStorage.setItem('rashmi_admin_token', 'sample-jwt-token-would-go-here');
        setIsAuthenticated(true);
        fetchNews();
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 800); // Simulate network delay
  };
  
  const handleLogout = () => {
    localStorage.removeItem('rashmi_admin_token');
    setIsAuthenticated(false);
    setNews([]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('You must be logged in to perform this action');
      return;
    }
    
    setLoading(true);
    
    try {
      // Map form data to the correct field names expected by Strapi
      const strapiData = {
        Heading: formData.title,
        Date: formData.date,
        Category: formData.category,
        Description: formData.excerpt,
        Content: formData.content,
        image: formData.image
      };
      
      if (formMode === 'create') {
        await createNews(strapiData as any);
      } else if (formMode === 'edit' && selectedId) {
        await updateNews(selectedId, strapiData as any);
      }
      
      // Reset form and refresh news
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Achievement',
        excerpt: '',
        content: '',
        image: null
      });
      setFormMode('create');
      setSelectedId(null);
      await fetchNews();
      
    } catch (err) {
      console.error('Error saving news:', err);
      setError('Failed to save news. Please check your form data and Strapi connection.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (item: NewsItem) => {
    if (!isAuthenticated) return;
    
    setFormMode('edit');
    setSelectedId(item.id);
    setFormData({
      title: item.title,
      date: item.date,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      image: null // Can't pre-fill file input
    });
  };

  const resetForm = () => {
    setFormMode('create');
    setSelectedId(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Achievement',
      excerpt: '',
      content: '',
      image: null
    });
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Achievement': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Expansion': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Award': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Sustainability': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Admin Login | Rashmi Metaliks</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="border-border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-display font-bold text-center flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-rashmi-red" />
                  Admin Access
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access the admin panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={authFormData.username}
                        onChange={handleAuthInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={authFormData.password}
                        onChange={handleAuthInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  This area is restricted to authorized personnel only.
                  <br />Unauthorized access attempts may be logged and reported.
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Admin panel if authenticated
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>News Admin | Rashmi Metaliks</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">
              News Management <span className="text-rashmi-red">Panel</span>
            </h1>
            <p className="text-muted-foreground mt-2">Create and manage news articles for the Rashmi Metaliks website</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={fetchNews} 
              variant="outline" 
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="list" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list" className="gap-2"><Newspaper className="h-4 w-4" /> News Items</TabsTrigger>
            <TabsTrigger value="form" className="gap-2">{formMode === 'create' ? <PlusCircle className="h-4 w-4" /> : <Edit className="h-4 w-4" />} {formMode === 'create' ? 'Create News' : 'Edit News'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-rashmi-red" />
                  News Articles
                </CardTitle>
                <CardDescription>
                  {news.length} items in the news database
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading && news.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading news items...</p>
                  </div>
                ) : news.length > 0 ? (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {news.map(item => (
                        <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                          <div className="flex items-start justify-between p-6">
                            <div>
                              <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  {new Date(item.date).toLocaleDateString()}
                                </Badge>
                                <Badge className={`${getCategoryColor(item.category)}`}>
                                  {item.category}
                                </Badge>
                              </div>
                              <p className="mt-3 text-muted-foreground line-clamp-2">{item.excerpt}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              className="shrink-0 gap-1"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </Button>
                          </div>
                          {item.image && (
                            <div className="px-6 pb-6">
                              <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted">
                                <img 
                                  src={typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image as any)} 
                                  alt={item.title}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg py-12 text-center">
                    <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-medium">No news items found</p>
                    <p className="text-sm text-muted-foreground mt-1">Create your first news item using the form.</p>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="mt-4 gap-2"
                      onClick={() => {
                        const formTab = document.querySelector('[data-value="form"]');
                        if (formTab) {
                          formTab.dispatchEvent(new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                          }));
                        }
                      }}
                    >
                      <PlusCircle className="h-4 w-4" /> Create News Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="form" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {formMode === 'create' ? <PlusCircle className="h-5 w-5 text-rashmi-red" /> : <Edit className="h-5 w-5 text-rashmi-red" />}
                  {formMode === 'create' ? 'Create News Item' : 'Edit News Item'}
                </CardTitle>
                <CardDescription>
                  {formMode === 'create' 
                    ? 'Create a new news article to display on the website' 
                    : `Editing news item with ID: ${selectedId}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter news title"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Date
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category" className="flex items-center gap-2">
                          <Tag className="h-4 w-4" /> Category
                        </Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => handleSelectChange(value, 'category')}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(cat)}`}></span>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image" className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" /> Featured Image
                        </Label>
                        <div className="relative">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="pt-2"
                          />
                          {formData.image && (
                            <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md bg-muted">
                              <img 
                                src={URL.createObjectURL(formData.image)} 
                                alt="Preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          {formMode === 'edit' && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Leave empty to keep the current image
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="excerpt" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Excerpt (Short Description)
                        </Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          value={formData.excerpt}
                          onChange={handleInputChange}
                          placeholder="Brief description of the news item"
                          className="min-h-24"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Content
                        </Label>
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="Full content of the news article"
                          className="min-h-64"
                          required
                        />
                      </div>
                    </div>
                  </div>
                
                  <Separator />
                  
                  <div className="flex justify-end gap-3">
                    {formMode === 'edit' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          {formMode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                      ) : (
                        <>
                          {formMode === 'create' ? (
                            <>
                              <PlusCircle className="h-4 w-4" />
                              Create News Item
                            </>
                          ) : (
                            <>
                              <Edit className="h-4 w-4" />
                              Update News Item
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsAdmin; 