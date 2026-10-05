"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[50svh] min-h-[24rem] overflow-hidden">
        <Image
          src="/amber-necklace-blue.jpeg"
          alt="Anne Silver jewelry detail"
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
              Customs and Repairs
            </h1>
            <p className="mb-0 text-lg leading-relaxed text-white/90 md:text-xl">
              Create a one-of-a-kind piece that tells your story through the timeless artistry of
              Ethiopian craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)] lg:gap-16">
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
                At Anne Silver, we believe that the most meaningful jewelry is deeply personal. Our
                custom design service combines your unique vision with the exceptional skills of our
                Ethiopian artisans to create pieces that are truly one-of-a-kind.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                Whether you&apos;re commemorating a special occasion, honoring your heritage, or
                simply bringing a dream design to life, our team will guide you through every step
                of the creation process. From initial sketches to the final polish, your custom
                piece will receive the meticulous attention it deserves.
              </p>
              <p className="text-lg leading-relaxed text-neutral-600">
                Each custom creation is more than jewelry - it&apos;s a wearable work of art that
                carries your personal story and the rich tradition of Ethiopian craftsmanship.
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
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/model-amber-necklace-closeup.jpeg"
                  alt="Anne Silver jewelry styled on a model"
                  fill
                  sizes="(max-width: 1024px) 90vw, 60vw"
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
                Our custom design process is thoughtfully structured to ensure your vision comes to
                life exactly as you imagine it.
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
                    <span className="-translate-y-1 leading-none">1</span>
                  </div>
                  <div className="flex-1 overflow-hidden bg-white shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Initial Consultation
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Share your ideas, inspirations, and preferences. We&apos;ll discuss design
                          possibilities, materials, and incorporate traditional Ethiopian elements
                          that resonate with your vision.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/rectangular-stone-cutout-ring.png"
                            alt="Initial consultation process"
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
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
                    <span className="-translate-y-1 leading-none">2</span>
                  </div>
                  <div className="flex-1 overflow-hidden bg-white shadow-sm md:ml-24">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Design Development
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Our artisans create detailed sketches and 3D renderings of your piece. We
                          refine the design together until every detail perfectly captures your
                          vision.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/ornate-ring-design-sketch.png"
                            alt="Design development process"
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
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
                    <span className="-translate-y-1 leading-none">3</span>
                  </div>
                  <div className="flex-1 overflow-hidden bg-white shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Craftsmanship
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Your piece is meticulously handcrafted using traditional techniques. We
                          provide updates throughout the process, ensuring transparency and your
                          complete satisfaction.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/jeweler-torch-closeup.png"
                            alt="Craftsmanship process"
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
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
                    <span className="-translate-y-1 leading-none">4</span>
                  </div>
                  <div className="flex-1 overflow-hidden bg-white shadow-sm md:ml-24">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                      <div className="flex-1 p-8">
                        <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                          Final Presentation
                        </h3>
                        <p className="mb-0 leading-relaxed text-neutral-600">
                          Your completed custom piece is presented with care instructions, ready to
                          become a treasured part of your story.
                        </p>
                      </div>
                      <div className="w-full flex-shrink-0 md:h-full md:w-auto">
                        <div className="relative aspect-square h-[200px] w-full md:w-[200px]">
                          <Image
                            src="/blue-stone-statement-ring-on-hand.png"
                            alt="Final presentation"
                            fill
                            sizes="(max-width: 768px) 100vw, 200px"
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
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/jeweler-at-torch-workbench.png"
                  alt="Artisan at work - Traditional Ethiopian jewelry craftsmanship"
                  fill
                  sizes="(max-width: 768px) 100vw, 840px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repairs Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="/jeweler-torch-closeup.png"
              alt="Jewelry repair at the Anne Silver workshop"
              fill
              sizes="(max-width: 1024px) 90vw, 60vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl">Care that extends the life of every piece</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Our workshop can assess cleaning, polishing, clasp replacement, resizing, and common
              repairs. Every piece is inspected individually so we can recommend the most careful
              approach for its materials and construction.
            </p>
            <p className="text-lg leading-relaxed text-neutral-600">
              Send us a clear photo and a short description of the issue, or bring the piece to the
              shop for an in-person assessment.
            </p>
            <motion.a href="/contact" className="btn btn-primary mt-2">
              Ask About a Repair
            </motion.a>
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
              Start Your Custom Journey
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600">
              Ready to create something extraordinary? Contact us to begin designing your custom
              piece. Let&apos;s transform your vision into a timeless work of art.
            </p>
            <motion.a href="/contact" className="btn btn-primary">
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
