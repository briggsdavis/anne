"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Hammer, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const workshopFeatures = [
  {
    icon: Hammer,
    title: "Hands-On Learning",
    description:
      "Learn traditional Ethiopian jewelry-making techniques directly from master artisans in an intimate workshop setting.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Limited to 6 participants per session to ensure personalized attention and meaningful learning experiences.",
  },
  {
    icon: Clock,
    title: "Flexible Duration",
    description:
      "Choose from half-day introductory sessions to multi-day intensive workshops based on your interest and skill level.",
  },
  {
    icon: Calendar,
    title: "Custom Scheduling",
    description:
      "Private workshops available for groups, perfect for team building, special occasions, or cultural experiences.",
  },
]

export default function WorkshopPage() {
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
              Jewelry Workshops
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600 md:text-xl">
              Discover the ancient art of Ethiopian jewelry making through
              immersive workshops led by our master craftsmen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
                Learn from Master Artisans
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                Anne Silver workshops offer a rare opportunity to learn
                jewelry-making techniques that have been passed down through
                generations of Ethiopian craftsmen. Our experienced artisans
                will guide you through the fascinating process of creating your
                own silver jewelry.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                Whether you&apos;re a complete beginner or an experienced
                jewelry enthusiast, our workshops are designed to accommodate
                all skill levels. You&apos;ll work with professional tools and
                high-quality materials while learning about the cultural
                significance behind traditional Ethiopian designs.
              </p>
              <p className="text-lg leading-relaxed text-neutral-600">
                Each participant leaves with their handcrafted piece and a
                deeper appreciation for the artistry and heritage of Ethiopian
                jewelry making.
              </p>
            </motion.div>

            {/* Image Placeholder 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/back.png"
                  alt="Workshop in Action - Hands-On Learning Experience"
                  width={1000}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="brand-accent mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              Workshop Experience
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Our workshops combine traditional techniques with modern teaching
              methods for an unforgettable learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workshopFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 transition-colors group-hover:bg-primary-200">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Types Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
                Available Workshops
              </h2>
              <p className="text-lg leading-relaxed text-neutral-600">
                Choose from our range of workshops designed to suit different
                interests and skill levels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between"
              >
                <div className="rounded-xl bg-neutral-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                    Introduction to Silver Working
                  </h3>

                  <Link
                    href="https://instagram.com/annesilver_ethiopia1"
                    target="_blank"
                    className="text-sm font-medium text-primary-600"
                  >
                    Check our Instagram for more information
                  </Link>

                  <p className="mt-2 leading-relaxed text-neutral-600">
                    Perfect for beginners. Learn basic techniques including
                    sawing, filing, and polishing. Create a simple pendant or
                    ring while discovering Ethiopian design traditions.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                    Traditional Ethiopian Techniques
                  </h3>

                  <Link
                    href="https://instagram.com/annesilver_ethiopia1"
                    target="_blank"
                    className="text-sm font-medium text-primary-600"
                  >
                    Check our Instagram for more information
                  </Link>

                  <p className="mt-2 leading-relaxed text-neutral-600">
                    Explore traditional methods including filigree work and
                    granulation. Create an authentic Ethiopian-style piece while
                    learning about cultural symbolism.
                  </p>
                </div>

                {/* <div className="rounded-xl bg-neutral-50 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                    Advanced Jewelry Making
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary-600">
                    2-Day Intensive
                  </p>
                  <p className="leading-relaxed text-neutral-600">
                    For experienced crafters. Master complex techniques
                    including stone setting and advanced metalworking. Complete
                    a sophisticated piece of your own design.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-50 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                    Private Group Sessions
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary-600">
                    Customizable Duration
                  </p>
                  <p className="leading-relaxed text-neutral-600">
                    Perfect for team building, special celebrations, or cultural
                    experiences. We'll tailor the workshop to your group's
                    interests and skill level.
                  </p>
                </div> */}
              </motion.div>

              {/* Image Placeholder 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative lg:sticky lg:top-24"
              >
                <div className="aspect-[9/10] overflow-hidden rounded-2xl">
                  <Image
                    src="/tools.jpg"
                    alt="Workshop Participants - Creating Together"
                    width={600}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              What&apos;s Included
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ All tools and equipment
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ High-quality silver materials
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ Expert instruction in English/Amharic
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ Your finished jewelry piece
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ Certificate of completion
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-0 font-medium text-neutral-900">
                  ✓ Light refreshments
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              Book Your Workshop
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600">
              Ready to embark on your jewelry-making journey? Contact us to
              check availability and book your workshop experience.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Book Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
