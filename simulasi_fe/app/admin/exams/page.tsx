"use client";

import { useState } from "react";
import {
  useGetExamsQuery,
  useGetClassesQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
  Exam,
} from "@/lib/redux/api/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function ExamsPage() {
  const { data: examsData, isLoading, refetch } = useGetExamsQuery();
  const { data: classesData } = useGetClassesQuery();
  const [createExam] = useCreateExamMutation();
  const [updateExam] = useUpdateExamMutation();
  const [deleteExam] = useDeleteExamMutation();
  const { toast } = useToast();

  // Extract arrays from wrapped response
  const exams = Array.isArray(examsData?.data) ? examsData.data : [];
  const classes = Array.isArray(classesData?.data) ? classesData.data : [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState({
    class_id: "",
    title: "",
    subtitle: "",
    subject: "",
    grade: "",
    total_questions: "",
    duration: "",
    passing_score: "",
    time_limit: "",
  });

  const handleOpenDialog = (exam?: Exam) => {
    if (exam) {
      setEditingExam(exam);
      setFormData({
        class_id: exam.class_id.toString(),
        title: exam.title || "",
        subtitle: exam.subtitle || "",
        subject: exam.subject || "",
        grade: exam.grade || "",
        total_questions: exam.total_questions?.toString() || "",
        duration: exam.duration?.toString() || "",
        passing_score: exam.passing_score?.toString() || "",
        time_limit: exam.time_limit || "",
      });
    } else {
      setEditingExam(null);
      setFormData({
        class_id: "",
        title: "",
        subtitle: "",
        subject: "",
        grade: "",
        total_questions: "",
        duration: "",
        passing_score: "",
        time_limit: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        class_id: parseInt(formData.class_id),
        title: formData.title || undefined,
        subtitle: formData.subtitle || undefined,
        subject: formData.subject || undefined,
        grade: formData.grade || undefined,
        total_questions: formData.total_questions
          ? parseInt(formData.total_questions)
          : undefined,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        passing_score: formData.passing_score
          ? parseFloat(formData.passing_score)
          : undefined,
        time_limit: formData.time_limit || undefined,
      };

      if (editingExam) {
        await updateExam({ id: editingExam.id, data: payload }).unwrap();
        toast({
          title: "Berhasil",
          description: "Ujian berhasil diupdate",
        });
      } else {
        await createExam(payload).unwrap();
        toast({
          title: "Berhasil",
          description: "Ujian berhasil dibuat",
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
    if (!confirm("Apakah Anda yakin ingin menghapus ujian ini?")) return;

    try {
      await deleteExam(id).unwrap();
      toast({
        title: "Berhasil",
        description: "Ujian berhasil dihapus",
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Ujian</h1>
          <p className="mt-2 text-gray-600">Kelola data ujian</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Ujian
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Ujian</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jumlah Soal</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.id}</TableCell>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.class?.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.total_questions}</TableCell>
                    <TableCell>{exam.duration} menit</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDialog(exam)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(exam.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    Belum ada data ujian
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingExam ? "Edit Ujian" : "Tambah Ujian Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="class_id">Kelas *</Label>
                <Select
                  value={formData.class_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, class_id: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="total_questions">Jumlah Soal</Label>
                  <Input
                    id="total_questions"
                    type="number"
                    value={formData.total_questions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_questions: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Durasi (menit)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="passing_score">Nilai Lulus</Label>
                  <Input
                    id="passing_score"
                    type="number"
                    step="0.01"
                    value={formData.passing_score}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passing_score: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time_limit">Batas Waktu</Label>
                  <Input
                    id="time_limit"
                    value={formData.time_limit}
                    onChange={(e) =>
                      setFormData({ ...formData, time_limit: e.target.value })
                    }
                  />
                </div>
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
              <Button type="submit">{editingExam ? "Update" : "Simpan"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
