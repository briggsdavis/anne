"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CustomPage() {
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
              Custom Jewelry
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600 md:text-xl">
              Create a one-of-a-kind piece that tells your story through the
              timeless artistry of Ethiopian craftsmanship.
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
                Your Vision, Our Expertise
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                At Anne Silver, we believe that the most meaningful jewelry is
                deeply personal. Our custom design service combines your unique
                vision with the exceptional skills of our Ethiopian artisans to
                create pieces that are truly one-of-a-kind.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                Whether you&apos;re commemorating a special occasion, honoring
                your heritage, or simply bringing a dream design to life, our
                team will guide you through every step of the creation process.
                From initial sketches to the final polish, your custom piece
                will receive the meticulous attention it deserves.
              </p>
              <p className="text-lg leading-relaxed text-neutral-600">
                Each custom creation is more than jewelry - it&apos;s a wearable
                work of art that carries your personal story and the rich
                tradition of Ethiopian craftsmanship.
              </p>
            </motion.div>

            {/* Image Placeholder 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative aspect-[4/5] w-[80%] overflow-hidden rounded-2xl">
                <Image
                  src="/filler.png"
                  alt="Custom design process"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
                How It Works
              </h2>
              <p className="text-lg leading-relaxed text-neutral-600">
                Our custom design process is thoughtfully structured to ensure
                your vision comes to life exactly as you imagine it.
              </p>
            </motion.div>

            {/* Timeline Style Process */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute top-0 left-8 hidden h-full w-0.5 bg-primary-200 md:block" />

              <div className="space-y-12">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                    1
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Initial Consultation
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Share your ideas, inspirations, and preferences.
                          We&apos;ll discuss design possibilities, materials,
                          and incorporate traditional Ethiopian elements that
                          resonate with your vision.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/initial.png"
                            alt="Initial consultation process"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8 md:flex-row-reverse"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg md:absolute md:left-0">
                    2
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm md:ml-24">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Design Development
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Our artisans create detailed sketches and 3D
                          renderings of your piece. We refine the design
                          together until every detail perfectly captures your
                          vision.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/design.png"
                            alt="Design development process"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                    3
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Craftsmanship
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Your piece is meticulously handcrafted using
                          traditional techniques. We provide updates throughout
                          the process, ensuring transparency and your complete
                          satisfaction.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/crafting.png"
                            alt="Craftsmanship process"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8 md:flex-row-reverse"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg md:absolute md:left-0">
                    4
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm md:ml-24">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Final Presentation
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Your completed custom piece is presented with a
                          certificate of authenticity and care instructions,
                          ready to become a treasured part of your story.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/presentation.png"
                            alt="Final presentation"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src="/artisan.png"
                  alt="Artisan at work - Traditional Ethiopian jewelry craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
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
              Start Your Custom Journey
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600">
              Ready to create something extraordinary? Contact us to begin
              designing your custom piece. Let&apos;s transform your vision into
              a timeless work of art.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
