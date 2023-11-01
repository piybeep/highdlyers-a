import { MainLayout } from "@/layouts";

export default function HomePage() {
    return (
        <div>
            Главная страница
        </div>
    );
};

HomePage.getLayout = function getLayout(page: any) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}