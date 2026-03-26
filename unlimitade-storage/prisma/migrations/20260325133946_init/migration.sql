-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" BIGINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "photoUrl" TEXT,
    "authDate" INTEGER NOT NULL,
    "channelId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "telegramFileId" TEXT NOT NULL,
    "telegramMessageId" INTEGER NOT NULL,
    "thumbnailFileId" TEXT,
    "isImage" BOOLEAN NOT NULL DEFAULT false,
    "isVideo" BOOLEAN NOT NULL DEFAULT false,
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "folderId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dateTaken" DATETIME,
    CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FileTag" (
    "fileId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("fileId", "tagId"),
    CONSTRAINT "FileTag_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FileTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "Folder_userId_parentId_idx" ON "Folder"("userId", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_userId_parentId_name_key" ON "Folder"("userId", "parentId", "name");

-- CreateIndex
CREATE INDEX "File_userId_folderId_idx" ON "File"("userId", "folderId");

-- CreateIndex
CREATE INDEX "File_userId_isImage_idx" ON "File"("userId", "isImage");

-- CreateIndex
CREATE INDEX "File_userId_isFavorite_idx" ON "File"("userId", "isFavorite");

-- CreateIndex
CREATE INDEX "File_originalName_idx" ON "File"("originalName");

-- CreateIndex
CREATE INDEX "File_mimeType_idx" ON "File"("mimeType");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
