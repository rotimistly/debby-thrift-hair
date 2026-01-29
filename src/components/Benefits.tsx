import { Check, Heart, Truck, Wallet, Shield } from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Budget-Friendly",
    description: "Quality hair at prices that won't break the bank. Looking good shouldn't cost a fortune.",
  },
  {
    icon: Check,
    title: "Neatly Selected",
    description: "Every piece is carefully inspected and selected to ensure top quality.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "We deliver to every corner of the country. Your hair comes to you!",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Only the best thrift finds make it to our collection. We stand by our selection.",
  },
];

const Benefits = () => {
  return (
    <section id="about" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            The Thrift Hair Difference
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            We believe everyone deserves to look and feel beautiful. That's why we
            offer affordable, high-quality thrift hair options.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-card p-6 text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary">
                <benefit.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-8 rounded-2xl bg-primary p-8 text-center sm:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center justify-center gap-1">
              <Heart className="h-5 w-5 text-primary-foreground" />
              <span className="text-3xl font-bold text-primary-foreground">500+</span>
            </div>
            <p className="text-sm text-primary-foreground/80">Happy Customers</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-primary-foreground">100%</div>
            <p className="text-sm text-primary-foreground/80">Quality Checked</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-primary-foreground">24/7</div>
            <p className="text-sm text-primary-foreground/80">WhatsApp Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
