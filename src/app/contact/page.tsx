"use client"

import { motion } from "framer-motion"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "annesilverethiopia@gmail.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+251 91 137 4743",
    description: "Call us during business hours",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Addis Ababa, Ethiopia",
    description: "Visit our workshop by appointment",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Fri: 9AM - 7:30PM",
    description: "Ethiopian Standard Time (EAT)",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="brand-accent mb-6 text-4xl font-bold text-neutral-900 md:text-5xl">
              Contact Us
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600 md:text-xl">
              Have a question about our jewelry or interested in a custom piece?
              We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-neutral-900">
                Get in Touch
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-neutral-600">
                Whether you&apos;re interested in purchasing a piece from our
                collection, commissioning a custom design, or simply learning
                more about our craftsmanship, we&apos;re here to help.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <info.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-neutral-900">
                        {info.title}
                      </h3>
                      <p className="mb-1 font-medium text-neutral-900">
                        {info.content}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 rounded-xl bg-primary-50 p-6"
              >
                <h3 className="mb-2 font-semibold text-neutral-900">
                  About Our Jewelry
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Each piece is handcrafted by skilled Ethiopian artisans using
                  traditional techniques. We&apos;re happy to provide detailed
                  information about materials, craftsmanship, and the cultural
                  significance of our designs.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                Find Us
              </h2>

              <h5>Our New Store</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.417362516006!2d38.75495587511357!3d9.02563748904136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b854a1fa5f731%3A0x314309aaa190a0dd!2sREBTEK%20APARTMENTS!5e0!3m2!1sen!2set!4v1751699677237!5m2!1sen!2set"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border border-neutral-300"
              />

              <h5 className="mt-6">Our Main Store</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.417298063436!2d38.75497097511348!3d9.025643389041221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8564353f1f8f%3A0xbf2d6ac168e0d288!2sAnne%20Silver%20Ethiopia!5e0!3m2!1sen!2set!4v1751699616507!5m2!1sen!2set"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border border-neutral-300"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
