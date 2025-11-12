"use client";

import { useGetClassesQuery } from "@/lib/redux/api/adminApi";
import { useGetExamsQuery } from "@/lib/redux/api/adminApi";
import { useGetUsersQuery } from "@/lib/redux/api/adminApi";
import { useGetQuestionsQuery } from "@/lib/redux/api/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileQuestion, Users, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const { data: classesData, isLoading: classesLoading } = useGetClassesQuery();
  const { data: examsData, isLoading: examsLoading } = useGetExamsQuery();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();
  const {
    data: questionsData,
    isLoading: questionsLoading,
    error: questionsError,
  } = useGetQuestionsQuery({});

  // Extract arrays from wrapped response - ensure they are arrays
  const classes = Array.isArray(classesData?.data) ? classesData.data : [];
  const exams = Array.isArray(examsData?.data) ? examsData.data : [];
  const users = Array.isArray(usersData?.data) ? usersData.data : [];
  const questions = Array.isArray(questionsData?.data)
    ? questionsData.data
    : [];

  if (classesLoading || examsLoading || usersLoading || questionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Kelas",
      value: classes.length,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Ujian",
      value: exams.length,
      icon: FileQuestion,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Pengguna",
      value: users.length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Soal",
      value: questions.length,
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Selamat datang di panel admin CBT</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kelas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {classes.length > 0 ? (
              classes.slice(0, 5).map((cls) => (
                <div key={cls.id} className="py-3 border-b last:border-0">
                  <h3 className="font-semibold">{cls.title}</h3>
                  <p className="text-sm text-gray-600">
                    {cls.subject} - {cls.grade}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Belum ada kelas</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ujian Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {exams.length > 0 ? (
              exams.slice(0, 5).map((exam) => (
                <div key={exam.id} className="py-3 border-b last:border-0">
                  <h3 className="font-semibold">{exam.title}</h3>
                  <p className="text-sm text-gray-600">
                    {exam.total_questions} soal • {exam.duration} menit
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Belum ada ujian</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
