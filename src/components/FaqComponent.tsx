import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

export const FaqComponent = ()=>{
    return <div className="flex flex-col items-center">
        <Accordion type="single" collapsible className="w-full text-md">
        <AccordionItem value="item-1">
        <AccordionTrigger>How does Trimly URL shortener works?</AccordionTrigger>
        <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
        </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
        <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
        <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
        </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
        <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
        <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
        </AccordionContent>
        </AccordionItem>
    </Accordion>
    </div>
  
}