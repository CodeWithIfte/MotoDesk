import { RenderMounted } from "@/components/render-mounted";
import { Sidebar } from "@/components/admin/sidebar";
import { ADMIN } from "@/constants/constants";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const supabase = await createClient();

    const { data: authData } = await supabase.auth.getUser();

    if (authData?.user) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id)
            .single();

        if (error || !data) {
            console.log("Error fetching user data", error);
            return;
        }

        if (data.role !== ADMIN) return redirect("/");
    }

    return (
        <RenderMounted>
            <div className="flex h-screen bg-background">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
            </div>
        </RenderMounted>
    );
}
