import AttendanceManagementView from "@/components/module/attendance/attendanceManagementView";

const ChiefEngineerAttendancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  return <AttendanceManagementView searchParams={searchParamsObj} />;
};

export default ChiefEngineerAttendancePage;