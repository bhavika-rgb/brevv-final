import Hero from "@/app/components/Hero/Hero";
import Ecosystem from "@/app/components/Ecosystem/Ecosystem";
import CoreFoundations from "@/app/components/CoreFoundations/CoreFoundations";
import ProductSuite from "@/app/components/ProductSuite/ProductSuite";
import Comparison from "@/app/components/Comparison/Comparison";
import SolidDirection from "@/app/components/SolidDirection/SolidDirection";
import Scale from "@/app/components/Scale/Scale";
import Sectors from "@/app/components/Sectors/Sectors";
import FAQ from "@/app/components/FAQ/FAQ";
import CTA from "@/app/components/CTA/CTA";
import Foundary from "@/app/components/Foundary/Foundary";

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