import LoginForm from "@/app/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Giriş Yap</h1>
          <p className="text-muted-foreground">
            Hesabınıza giriş yapmak için bilgilerinizi giriniz
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 