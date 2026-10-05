"use client"

import { SiInstagram } from "@icons-pack/react-simple-icons"
import { motion } from "framer-motion"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

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
      <section className="relative h-[50svh] min-h-[24rem] overflow-hidden">
        <Image
          src="/gemstone-rings-blue.jpeg"
          alt="Anne Silver jewelry display"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative container flex h-full items-end pb-10 lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="brand-accent mb-4 text-4xl font-bold text-white md:text-5xl">
              Contact Us
            </h1>
            <p className="mb-0 text-lg leading-relaxed text-white/90 md:text-xl">
              Have a question about our jewelry or interested in a custom piece? We&apos;d love to
              hear from you.
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
              <h2 className="mb-6 text-3xl font-bold text-neutral-900">Get in Touch</h2>
              <p className="mb-8 text-lg leading-relaxed text-neutral-600">
                Whether you&apos;re interested in purchasing a piece from our collection,
                commissioning a custom design, or simply learning more about our craftsmanship,
                we&apos;re here to help.
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
                      <h3 className="mb-1 font-semibold text-neutral-900">{info.title}</h3>
                      <p className="mb-1 font-medium text-neutral-900">{info.content}</p>
                      <p className="text-sm text-neutral-600">{info.description}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: contactInfo.length * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                    <SiInstagram className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-neutral-900">Instagram</h3>
                    <a
                      href="https://www.instagram.com/annesilver_ethiopia1/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-1 block font-medium text-primary-600 transition-colors hover:text-primary-700"
                    >
                      @annesilver_ethiopia1
                    </a>
                    <p className="text-sm text-neutral-600">Follow our latest work and updates</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 rounded-xl bg-primary-50 p-6"
              >
                <h3 className="mb-2 font-semibold text-neutral-900">About Our Jewelry</h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Each piece is handcrafted by skilled Ethiopian artisans using traditional
                  techniques. We&apos;re happy to provide detailed information about materials,
                  craftsmanship, and the cultural significance of our designs.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">Find Us</h2>

              <h5>Our Main Store</h5>
              <iframe
                title="Map to our main store"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.417298063436!2d38.75497097511348!3d9.025643389041221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8564353f1f8f%3A0xbf2d6ac168e0d288!2sAnne%20Silver%20Ethiopia!5e0!3m2!1sen!2set!4v1751699616507!5m2!1sen!2set"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border border-neutral-300"
              />

              <h5 className="mt-6">Our Second Store</h5>
              <iframe
                title="Map to our second store"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.5946833674047!2d38.78824300000001!3d9.009390999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDAnMzMuOCJOIDM4wrA0NycxNy43IkU!5e0!3m2!1sen!2set!4v1752522382061!5m2!1sen!2set"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border border-neutral-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              Go visit our store.
            </h2>
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-primary-lg md:aspect-[16/9]">
              <Image
                src="/anne-silver-exterior.jpg"
                alt="Exterior entrance of the Anne Silver store"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
