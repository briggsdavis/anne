"use client"

import { motion } from "framer-motion"
import { Award, Globe, Heart, Users } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Heritage",
    description:
      "Every piece celebrates our rich Ethiopian cultural heritage and traditional craftsmanship techniques.",
  },
  {
    icon: Users,
    title: "Artisans",
    description:
      "We work directly with skilled local artisans, supporting their craft and preserving ancient techniques.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Each piece is meticulously crafted using the finest materials and attention to detail.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Sharing Ethiopian beauty with the world while maintaining our authentic cultural roots.",
  },
]

export default function AboutPage() {
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
              Our Story
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600 md:text-xl">
              Anne Silver was born from a passion to share the exquisite beauty
              of Ethiopian jewelry with the world, while honoring the ancient
              traditions that make each piece unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
                Celebrating Ethiopian Excellence
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                Ethiopia has a rich history of goldsmithing that dates back
                thousands of years. Our ancestors were master craftsmen who
                created intricate jewelry that told stories, marked important
                life events, and showcased the remarkable skill of Ethiopian
                artisans.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                At Anne Silver, we continue this tradition by working with
                contemporary artisans who have inherited these time-honored
                techniques. Each piece in our collection is a bridge between
                ancient wisdom and modern elegance.
              </p>
              <p className="text-lg leading-relaxed text-neutral-600">
                Our mission is to preserve and celebrate this heritage while
                creating jewelry that speaks to people around the world, sharing
                the beauty and craftsmanship of Ethiopian culture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary-200">
                      <span className="text-4xl font-bold text-primary-700">
                        AS
                      </span>
                    </div>
                    <p className="text-lg font-medium text-neutral-700">
                      Ethiopian Artistry
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">
                      Preserving Ancient Traditions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              These core principles guide everything we do, from selecting
              artisans to crafting each unique piece.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 transition-colors group-hover:bg-primary-200">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
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
                The Art of Ethiopian Jewelry
              </h2>
              <p className="text-lg leading-relaxed text-neutral-600">
                Ethiopian jewelry making is an art form that combines technical
                skill with cultural storytelling. Each technique has been
                refined over centuries, passed down through generations of
                master craftsmen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              <div className="rounded-xl bg-neutral-50 p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  Traditional Techniques
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  Our artisans use traditional methods including filigree work,
                  granulation, and hand-forging to create intricate patterns
                  that have adorned Ethiopian jewelry for millennia.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  Cultural Symbols
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  Many of our designs incorporate traditional Ethiopian symbols
                  and motifs, each carrying deep cultural significance and
                  connecting the wearer to our rich heritage.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  Premium Materials
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  We work exclusively with high-quality materials including 18k
                  and 22k gold, sterling silver, and authentic Ethiopian
                  gemstones to ensure lasting beauty.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  Modern Applications
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  While honoring tradition, we also create contemporary pieces
                  that bring Ethiopian artistry into modern settings, making it
                  accessible to today&apos;s jewelry lovers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
