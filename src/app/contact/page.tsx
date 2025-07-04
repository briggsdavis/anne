"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

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
    content: "Mon - Fri: 9AM - 6PM",
    description: "Ethiopian Standard Time (EAT)",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                Send us a Message
              </h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4"
                >
                  <p className="font-medium text-green-700">
                    Thank you! Your message has been sent successfully.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="input"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="input"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    id="subject"
                    className="input"
                    placeholder="What is your inquiry about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={6}
                    className="input resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
