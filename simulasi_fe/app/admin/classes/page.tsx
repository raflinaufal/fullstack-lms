"use client";

import { useState } from "react";
import {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  Class,
} from "@/lib/redux/api/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClassesPage() {
  const { data, isLoading, refetch } = useGetClassesQuery();
  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  const { toast } = useToast();

  // Extract array from wrapped response
  const classes = Array.isArray(data?.data) ? data.data : [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    subject: "",
    grade: "",
    description: "",
  });

  const handleOpenDialog = (cls?: Class) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({
        title: cls.title,
        subtitle: cls.subtitle || "",
        subject: cls.subject || "",
        grade: cls.grade || "",
        description: cls.description || "",
      });
    } else {
      setEditingClass(null);
      setFormData({
        title: "",
        subtitle: "",
        subject: "",
        grade: "",
        description: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await updateClass({ id: editingClass.id, data: formData }).unwrap();
        toast({
          title: "Berhasil",
          description: "Kelas berhasil diupdate",
        });
      } else {
        await createClass(formData).unwrap();
        toast({
          title: "Berhasil",
          description: "Kelas berhasil dibuat",
        });
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kelas ini?")) return;

    try {
      await deleteClass(id).unwrap();
      toast({
        title: "Berhasil",
        description: "Kelas berhasil dihapus",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Kelas</h1>
          <p className="mt-2 text-gray-600">Kelola data kelas ujian</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelas
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kelas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Subjudul</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.id}</TableCell>
                    <TableCell className="font-medium">{cls.title}</TableCell>
                    <TableCell>{cls.subtitle}</TableCell>
                    <TableCell>{cls.subject}</TableCell>
                    <TableCell>{cls.grade}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDialog(cls)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(cls.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Belum ada data kelas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingClass ? "Edit Kelas" : "Tambah Kelas Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subjudul</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Mata Pelajaran</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Tingkat</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit">
                {editingClass ? "Update" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
