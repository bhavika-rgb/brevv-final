import Hero from "@/components/Hero/Hero";
import Ecosystem from "@/components/Ecosystem/Ecosystem";
import CoreFoundations from "@/components/CoreFoundations/CoreFoundations";
import ProductSuite from "@/components/ProductSuite/ProductSuite";
import Comparison from "@/components/Comparison/Comparison";
import SolidDirection from "@/components/SolidDirection/SolidDirection";
import Scale from "@/components/Scale/Scale";
import Sectors from "@/components/Sectors/Sectors";
import FAQ from "@/components/FAQ/FAQ";
import CTA from "@/components/CTA/CTA";
import Foundary from "@/components/Foundary/Foundary";

export default function Page() {
  return (
    <>
      <Hero />
       <Ecosystem />
      <CoreFoundations />
      <ProductSuite />
      <Comparison />
      <SolidDirection />
      <Scale />
      <Sectors />
      <FAQ />
      <CTA />
      <Foundary /> 
    </>
  );
}