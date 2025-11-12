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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function QuestionsPage() {
  const [selectedExamId, setSelectedExamId] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination logic
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuestions = questions.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleExamFilterChange = (value: string) => {
    setSelectedExamId(value);
    setCurrentPage(1);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    exam_id: "",
    question_text: "",
    stimulus_text: "",
    stimulus_image: "",
    correct_answer: "",
    explanation: "",
    options: [
      { option_label: "A", option_text: "" },
      { option_label: "B", option_text: "" },
      { option_label: "C", option_text: "" },
      { option_label: "D", option_text: "" },
    ],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [removeImage, setRemoveImage] = useState(false);

  const handleOpenDialog = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        exam_id: question.exam_id.toString(),
        question_text: question.question_text,
        stimulus_text: question.stimulus_text || "",
        stimulus_image: question.stimulus_image || "",
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
      // Set existing image preview - langsung gunakan URL dari API
      setImagePreview(question.stimulus_image || "");
    } else {
      setEditingQuestion(null);
      setFormData({
        exam_id: selectedExamId || "",
        question_text: "",
        stimulus_text: "",
        stimulus_image: "",
        correct_answer: "",
        explanation: "",
        options: [
          { option_label: "A", option_text: "" },
          { option_label: "B", option_text: "" },
          { option_label: "C", option_text: "" },
          { option_label: "D", option_text: "" },
        ],
      });
      setImagePreview("");
    }
    setImageFile(null);
    setRemoveImage(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Add basic fields
      formDataToSend.append("exam_id", formData.exam_id);
      formDataToSend.append("question_text", formData.question_text);
      formDataToSend.append("correct_answer", formData.correct_answer);

      if (formData.stimulus_text) {
        formDataToSend.append("stimulus_text", formData.stimulus_text);
      }
      if (formData.explanation) {
        formDataToSend.append("explanation", formData.explanation);
      }

      // Add image file
      if (imageFile) {
        formDataToSend.append("stimulus_image", imageFile);
      }

      // Add remove flag for update
      if (editingQuestion) {
        formDataToSend.append("_method", "PUT");
        if (removeImage) {
          formDataToSend.append("remove_stimulus_image", "true");
        }
      }

      // Add options
      const filteredOptions = formData.options.filter(
        (opt) => opt.option_text.trim() !== ""
      );
      filteredOptions.forEach((option, index) => {
        formDataToSend.append(
          `options[${index}][option_label]`,
          option.option_label
        );
        formDataToSend.append(
          `options[${index}][option_text]`,
          option.option_text
        );
      });

      if (editingQuestion) {
        await updateQuestion({
          id: editingQuestion.id,
          data: formDataToSend,
        }).unwrap();
        toast({
          title: "Berhasil",
          description: "Soal berhasil diupdate",
          variant: "success",
        });
      } else {
        await createQuestion(formDataToSend).unwrap();
        toast({
          title: "Berhasil",
          description: "Soal berhasil dibuat",
          variant: "success",
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
        variant: "success",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(true);
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
              <Select
                value={selectedExamId}
                onValueChange={handleExamFilterChange}
              >
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Soal Ujian</TableHead>
                  <TableHead>Jawaban Benar</TableHead>
                  <TableHead>Jumlah Opsi</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((question) => (
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

          {/* Pagination */}
          {questions.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </div>

                <p className="text-sm text-gray-700">
                  Menampilkan {startIndex + 1} -{" "}
                  {Math.min(endIndex, questions.length)} dari {questions.length}{" "}
                  soal
                </p>

                <div>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </div>
              </div>
            </div>
          )}
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
                <Label htmlFor="question_image">Gambar Soal</Label>
                <Input
                  id="question_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && !removeImage && (
                  <div className="relative mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview gambar soal"
                      className="h-auto max-w-full border rounded max-h-60"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
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
