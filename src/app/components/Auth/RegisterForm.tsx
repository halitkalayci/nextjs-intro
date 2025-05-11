"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const registerFormSchema = z.object({
  name: z.string()
    .min(3, { message: "İsim en az 3 karakter olmalıdır" }),
  email: z.string()
    .min(3, { message: "E-posta en az 3 karakter olmalıdır" })
    .email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string()
    .min(3, { message: "Şifre en az 3 karakter olmalıdır" })
    .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir" })
    .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir" })
    .regex(/[0-9]/, { message: "Şifre en az bir sayı içermelidir" })
    .regex(/[^A-Za-z0-9]/, { message: "Şifre en az bir sembol içermelidir" }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Kayıt sırasında bir hata oluştu');
      }

      // Başarılı kayıt
      toast.success('Kayıt başarılı!');
      
      // Login sayfasına yönlendir
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
      
    } catch (error: any) {
      console.error("Kayıt sırasında hata:", error);
      toast.error(error.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Kayıt Ol</CardTitle>
        <CardDescription>
          Yeni bir hesap oluşturmak için bilgilerinizi girin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ad Soyad" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="ornek@mail.com" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Şifreniz en az 3 karakter olmalı ve en az bir büyük harf, bir küçük harf, bir sayı ve bir sembol içermelidir.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kayıt Yapılıyor...
                </>
              ) : (
                "Kayıt Ol"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="text-sm text-muted-foreground">
          Zaten bir hesabınız var mı?{" "}
          <Link href="/auth/login" className="font-medium underline underline-offset-4 hover:text-primary">
            Giriş Yap
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 