import RegisterForm from "@/app/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Hesap Oluştur</h1>
          <p className="text-muted-foreground">
            Yeni bir hesap oluşturmak için aşağıdaki formu doldurunuz
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
} 