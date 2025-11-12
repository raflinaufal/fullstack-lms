"use client";

import { useState } from "react";
import {
  useGetQuestionsQuery,
  useGetExamsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  Question,
} from "@/lib/redux/api/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QuestionsPage() {
  const [selectedExamId, setSelectedExamId] = useState<string>("all");
  const {
    data: questionsData,
    isLoading,
    refetch,
  } = useGetQuestionsQuery(
    selectedExamId && selectedExamId !== "all"
      ? { exam_id: parseInt(selectedExamId) }
      : {}
  );
  const { data: examsData } = useGetExamsQuery();
  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const { toast } = useToast();

  // Extract arrays from wrapped response
  const questions = Array.isArray(questionsData?.data)
    ? questionsData.data
    : [];
  const exams = Array.isArray(examsData?.data) ? examsData.data : [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    exam_id: "",
    question_text: "",
    stimulus_text: "",
    stimulus_image: "",
    question_after_image: "",
    correct_answer: "",
    explanation: "",
    options: [
      { option_label: "A", option_text: "" },
      { option_label: "B", option_text: "" },
      { option_label: "C", option_text: "" },
      { option_label: "D", option_text: "" },
    ],
  });

  const handleOpenDialog = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        exam_id: question.exam_id.toString(),
        question_text: question.question_text,
        stimulus_text: question.stimulus_text || "",
        stimulus_image: question.stimulus_image || "",
        question_after_image: question.question_after_image || "",
        correct_answer: question.correct_answer,
        explanation: question.explanation || "",
        options:
          question.options.length > 0
            ? question.options
            : [
                { option_label: "A", option_text: "" },
                { option_label: "B", option_text: "" },
                { option_label: "C", option_text: "" },
                { option_label: "D", option_text: "" },
              ],
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        exam_id: selectedExamId || "",
        question_text: "",
        stimulus_text: "",
        stimulus_image: "",
        question_after_image: "",
        correct_answer: "",
        explanation: "",
        options: [
          { option_label: "A", option_text: "" },
          { option_label: "B", option_text: "" },
          { option_label: "C", option_text: "" },
          { option_label: "D", option_text: "" },
        ],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        exam_id: parseInt(formData.exam_id),
        question_text: formData.question_text,
        stimulus_text: formData.stimulus_text || undefined,
        stimulus_image: formData.stimulus_image || undefined,
        question_after_image: formData.question_after_image || undefined,
        correct_answer: formData.correct_answer,
        explanation: formData.explanation || undefined,
        options: formData.options.filter(
          (opt) => opt.option_text.trim() !== ""
        ),
      };

      if (editingQuestion) {
        await updateQuestion({
          id: editingQuestion.id,
          data: payload,
        }).unwrap();
        toast({
          title: "Berhasil",
          description: "Soal berhasil diupdate",
        });
      } else {
        await createQuestion(payload).unwrap();
        toast({
          title: "Berhasil",
          description: "Soal berhasil dibuat",
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
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

    try {
      await deleteQuestion(id).unwrap();
      toast({
        title: "Berhasil",
        description: "Soal berhasil dihapus",
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

  const updateOption = (index: number, field: string, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    const nextLabel = String.fromCharCode(65 + formData.options.length);
    setFormData({
      ...formData,
      options: [
        ...formData.options,
        { option_label: nextLabel, option_text: "" },
      ],
    });
  };

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) {
      toast({
        title: "Error",
        description: "Minimal harus ada 2 opsi jawaban",
        variant: "destructive",
      });
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Soal</h1>
          <p className="mt-2 text-gray-600">Kelola bank soal ujian</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Soal
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label>Filter berdasarkan Ujian</Label>
              <Select value={selectedExamId} onValueChange={setSelectedExamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua ujian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua ujian</SelectItem>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {exam.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Soal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Ujian</TableHead>
                  <TableHead>Jawaban Benar</TableHead>
                  <TableHead>Jumlah Opsi</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.length > 0 ? (
                  questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate">{question.question_text}</div>
                      </TableCell>
                      <TableCell>{question.exam?.title}</TableCell>
                      <TableCell className="font-medium">
                        {question.correct_answer}
                      </TableCell>
                      <TableCell>{question.options?.length || 0}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(question)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500"
                    >
                      {selectedExamId && selectedExamId !== "all"
                        ? "Belum ada soal untuk ujian ini"
                        : "Belum ada data soal"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion ? "Edit Soal" : "Tambah Soal Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="exam_id">Ujian *</Label>
                <Select
                  value={formData.exam_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, exam_id: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih ujian" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id.toString()}>
                        {exam.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stimulus_text">Stimulus (Teks Bacaan)</Label>
                <Textarea
                  id="stimulus_text"
                  value={formData.stimulus_text}
                  onChange={(e) =>
                    setFormData({ ...formData, stimulus_text: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="question_text">Pertanyaan *</Label>
                <Textarea
                  id="question_text"
                  value={formData.question_text}
                  onChange={(e) =>
                    setFormData({ ...formData, question_text: e.target.value })
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label>Opsi Jawaban *</Label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Input
                      className="w-16"
                      value={option.option_label}
                      onChange={(e) =>
                        updateOption(index, "option_label", e.target.value)
                      }
                      placeholder="A"
                      maxLength={1}
                    />
                    <Input
                      className="flex-1"
                      value={option.option_text}
                      onChange={(e) =>
                        updateOption(index, "option_text", e.target.value)
                      }
                      placeholder="Isi opsi jawaban"
                      required
                    />
                    {formData.options.length > 2 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeOption(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Opsi
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="correct_answer">Jawaban Benar *</Label>
                <Input
                  id="correct_answer"
                  value={formData.correct_answer}
                  onChange={(e) =>
                    setFormData({ ...formData, correct_answer: e.target.value })
                  }
                  required
                  placeholder="Contoh: Gunung (tanpa prefix A. B. C. D.)"
                />
                <p className="text-sm text-gray-600">
                  Masukkan jawaban tanpa prefix huruf (A, B, C, D)
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="explanation">Pembahasan</Label>
                <Textarea
                  id="explanation"
                  value={formData.explanation}
                  onChange={(e) =>
                    setFormData({ ...formData, explanation: e.target.value })
                  }
                  rows={3}
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
                {editingQuestion ? "Update" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
