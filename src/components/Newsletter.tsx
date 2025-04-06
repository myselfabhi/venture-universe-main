import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Newsletter() {
  return (
    <section className="bg-vu-blue text-vu-cyan py-8">
      <div className="px-4 md:px-8">
        <Card className="bg-[#1a1a1a] border-vu-blue/20 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4 text-center">Stay in Orbit with Venture Universe</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w-full sm:w-auto">
                <Label htmlFor="email-input" className="text-vu-cyan mb-2 block text-sm">
                  Your Email
                </Label>
                <Input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email"
                  className="text-vu-space bg-[#1a1a1a] border-vu-blue w-full sm:w-64"
                />
              </div>
              <Button
                type="submit"
                className="bg-vu-pink text-vu-space hover:bg-vu-yellow transition-colors duration-300 w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}