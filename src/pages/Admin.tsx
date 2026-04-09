import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Upload, Save, Users, FileEdit } from "lucide-react";

interface SiteContent {
  id: string;
  content: string;
  image_url: string | null;
  updated_at: string;
}

interface SiteVisit {
  id: string;
  visitor_ip: string;
  city: string | null;
  country: string | null;
  referrer: string | null;
  page: string;
  user_agent: string;
  created_at: string;
}

const contentLabels: Record<string, string> = {
  hero_title: "Заголовок главного экрана",
  hero_description: "Описание главного экрана",
  about_text: "Текст «Обо мне» (абзац 1)",
  about_text_2: "Текст «Обо мне» (абзац 2)",
  manifesto_quote: "Цитата-манифест",
};

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchContent();
      fetchVisits();
    }
  }, [user]);

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*");
    if (data) setContents(data);
  };

  const fetchVisits = async () => {
    let query = supabase
      .from("site_visits")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(100);

    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo + "T23:59:59");

    const { data, count } = await query;
    if (data) setVisits(data);
    if (count !== null) setTotalVisits(count);
  };

  const updateContent = async (id: string, content: string) => {
    setContents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content } : c))
    );
  };

  const saveContent = async (id: string) => {
    setSaving(true);
    const item = contents.find((c) => c.id === id);
    if (!item) return;

    const { error } = await supabase
      .from("site_content")
      .update({ content: item.content, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Сохранено", description: `Блок "${contentLabels[id] || id}" обновлён` });
    }
    setSaving(false);
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploading(id);
    const ext = file.name.split(".").pop();
    const path = `${id}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Ошибка загрузки", description: uploadError.message, variant: "destructive" });
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);

    const { error: updateError } = await supabase
      .from("site_content")
      .update({ image_url: urlData.publicUrl, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (updateError) {
      toast({ title: "Ошибка", description: updateError.message, variant: "destructive" });
    } else {
      toast({ title: "Фото загружено" });
      fetchContent();
    }
    setUploading(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Админ-панель</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="analytics">
          <TabsList className="mb-6">
            <TabsTrigger value="analytics" className="gap-2">
              <Users className="w-4 h-4" /> Аналитика
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileEdit className="w-4 h-4" /> Контент
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Посещения сайта</span>
                  <span className="text-sm font-normal text-muted-foreground bg-accent px-3 py-1 rounded-full">
                    Всего: {totalVisits}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4 flex-wrap">
                  <div>
                    <Label className="text-xs">С даты</Label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">По дату</Label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button size="sm" onClick={fetchVisits}>Применить</Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Город</TableHead>
                        <TableHead>Страна</TableHead>
                        <TableHead>Страница</TableHead>
                        <TableHead>Откуда</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visits.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            Пока нет посещений
                          </TableCell>
                        </TableRow>
                      ) : (
                        visits.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell className="text-sm">
                              {new Date(v.created_at).toLocaleString("ru-RU")}
                            </TableCell>
                            <TableCell>{v.city || "—"}</TableCell>
                            <TableCell>{v.country || "—"}</TableCell>
                            <TableCell>{v.page}</TableCell>
                            <TableCell className="text-xs max-w-[200px] truncate">
                              {v.referrer || "Прямой переход"}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-4">
              {contents.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {contentLabels[item.id] || item.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      value={item.content}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      rows={3}
                    />
                    <div className="flex items-center gap-3 flex-wrap">
                      <Button size="sm" onClick={() => saveContent(item.id)} disabled={saving}>
                        <Save className="w-4 h-4 mr-1" /> Сохранить
                      </Button>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`img-${item.id}`} className="cursor-pointer">
                          <div className="flex items-center gap-1 text-sm text-primary hover:underline">
                            <Upload className="w-4 h-4" />
                            {uploading === item.id ? "Загрузка..." : "Загрузить фото"}
                          </div>
                        </Label>
                        <input
                          id={`img-${item.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(item.id, file);
                          }}
                        />
                      </div>
                    </div>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt="Превью"
                        className="w-32 h-32 object-cover rounded-lg border border-border"
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
