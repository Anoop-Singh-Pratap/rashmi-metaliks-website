
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { TreePine, Sun, Droplets, HeartPulse, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';

const CSR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Corporate Social Responsibility | Rashmi Group</title>
        <meta name="description" content="Discover Rashmi Group's commitment to environmental sustainability, employee welfare, and community development through comprehensive CSR initiatives." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark to-background/80">
          <img 
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7" 
            alt="CSR background"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <RevealText
              text="Creating Positive Impact"
              as="h1"
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              staggerDelay={0.08}
            />
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              At Rashmi Group, CSR is embedded in our DNA. We're committed to sustainable growth 
              through environmental stewardship and community empowerment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CSR Philosophy */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our <span className="text-rashmi-red">CSR Philosophy</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
              <p className="text-lg">
                We maintain self-regulated CSR standards that go beyond compliance, focusing on 
                sustainable ecosystem development and employee welfare.
              </p>
              <p className="text-lg">
                Our leadership drives initiatives that create lasting positive impacts through 
                environmental conservation and community engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environmental Initiatives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Environmental <span className="text-rashmi-red">Stewardship</span>
            </h2>
            <p className="text-muted-foreground">Sustainable practices at the core of our operations</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <CSRCard 
              icon={<Droplets size={40} className="text-rashmi-red" />}
              title="Rainwater Harvesting"
              image="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf"
              stats="100% water recycling achieved"
            >
              Our plants implement advanced rainwater harvesting systems, setting industry benchmarks 
              in water conservation.
            </CSRCard>

            <CSRCard 
              icon={<Sun size={40} className="text-rashmi-red" />}
              title="Solar Energy"
              image="https://images.unsplash.com/photo-1509391366360-2e959784a276"
              stats="40% energy from renewables"
            >
              We've installed state-of-the-art solar farms reducing carbon footprint by 25,000 tons annually.
            </CSRCard>

            <CSRCard 
              icon={<TreePine size={40} className="text-rashmi-red" />}
              title="Green Coverage"
              image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8"
              stats="50,000+ Trees Planted"
            >
              Maintaining green belts that act as carbon sinks while preserving local biodiversity.
            </CSRCard>
          </div>
        </div>
      </section>

      {/* Employee & Community Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <HeartPulse size={48} className="text-rashmi-red mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Employee Wellness
              </h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive healthcare programs covering 10,000+ employees and families, coupled 
                with continuous skill development initiatives.
              </p>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Annual health checkups</li>
                <li>• Vaccination drives</li>
                <li>• Technical training programs</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <Users size={48} className="text-rashmi-red mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Community Engagement
              </h3>
              <p className="text-muted-foreground mb-6">
                We've impacted 50+ communities through education, healthcare, and infrastructure 
                development initiatives.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <StatBox value="15+" label="Schools Supported" />
                <StatBox value="200+" label="Community Projects" />
                <StatBox value="₹5Cr+" label="Annual Investment" />
                <StatBox value="10k+" label="Lives Impacted" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const CSRCard = ({ icon, title, image, stats, children }: { 
  icon: React.ReactNode,
  title: string,
  image: string,
  stats: string,
  children: React.ReactNode
}) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all"
  >
    <div className="relative h-48">
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rashmi-dark p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-card rounded-lg">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-rashmi-red font-medium">{stats}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="p-6">
      <p className="text-muted-foreground">{children}</p>
    </div>
  </motion.div>
);

const StatBox = ({ value, label }: { value: string, label: string }) => (
  <div className="bg-background border border-border p-4 rounded-lg text-center">
    <div className="text-2xl font-bold text-rashmi-red mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default CSR;
