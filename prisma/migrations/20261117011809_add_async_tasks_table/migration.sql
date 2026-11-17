-- CreateTable
CREATE TABLE "async_tasks" (
    "id" TEXT NOT NULL,
    "task_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "progress_percentage" INTEGER NOT NULL DEFAULT 0,
    "result_payload" TEXT,
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "async_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "async_tasks_status_idx" ON "async_tasks"("status");
