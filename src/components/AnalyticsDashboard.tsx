import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Gender Bias", value: 40 },
  { name: "Confirmation Bias", value: 30 },
  { name: "Halo Effect", value: 20 },
  { name: "Groupthink", value: 10 },
]

const AnalyticsDashboard = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto text-center mb-12">
        {/* 🔹 Heading made less bright */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white/80">
          Analytics Dashboard
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get insights into the types and frequency of biases detected across your
          communications.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  )
}

export default AnalyticsDashboard
