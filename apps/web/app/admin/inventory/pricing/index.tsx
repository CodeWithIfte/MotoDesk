import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Edit } from "lucide-react";

export const Pricing = () => {
    return (
        <TabsContent value="pricing" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Pricing Rules & Margins</CardTitle>
                    <CardDescription>
                        Configure pricing rules and profit margins for different
                        categories
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                category: "Motorcycles",
                                baseMargin: 8,
                                dealerDiscount: 5,
                                gst: 18,
                                additionalCharges: [
                                    "Registration",
                                    "Insurance",
                                    "Extended Warranty",
                                ],
                            },
                            {
                                category: "Spare Parts",
                                baseMargin: 25,
                                dealerDiscount: 10,
                                gst: 18,
                                additionalCharges: ["Installation", "Labor"],
                            },
                            {
                                category: "Accessories",
                                baseMargin: 30,
                                dealerDiscount: 15,
                                gst: 18,
                                additionalCharges: ["Installation"],
                            },
                        ].map((rule) => (
                            <div
                                key={rule.category}
                                className="p-4 border rounded-lg"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold">
                                        {rule.category}
                                    </h3>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit Rule
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">
                                            Base Margin
                                        </p>
                                        <p className="font-medium">
                                            {rule.baseMargin}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">
                                            Dealer Discount
                                        </p>
                                        <p className="font-medium">
                                            {rule.dealerDiscount}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">
                                            GST
                                        </p>
                                        <p className="font-medium">
                                            {rule.gst}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">
                                            Additional Charges
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {rule.additionalCharges.map(
                                                (charge) => (
                                                    <Badge
                                                        key={charge}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {charge}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};
