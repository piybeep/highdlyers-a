import { MainLayout } from "@/layouts";

export default function ArticlesPage() {
    return (
        <div>
            articles
        </div>
    );
};

ArticlesPage.getLayout = function getLayout(page: any) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}