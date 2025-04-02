// src/components/Newsletter.tsx
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Newsletter() {
  return (
    <section className="bg-vu-blue text-vu-cyan py-8 text-center">
      <div className="px-4 md:px-8">
        <h2 className="text-2xl font-bold mb-4">Stay in Orbit with Venture Universe</h2>
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" className="text-vu-space" />
          <Button className="bg-vu-pink text-vu-space hover:bg-vu-yellow">Subscribe</Button>
        </div>
      </div>
    </section>
  );
}