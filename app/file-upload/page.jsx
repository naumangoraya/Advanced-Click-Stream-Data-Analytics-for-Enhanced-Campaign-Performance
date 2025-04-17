"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, Upload, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FileUploadPage() {
  const [platforms, setPlatforms] = useState(["Amazon", "AliExpress", "Daraz"])
  const [newPlatform, setNewPlatform] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleAddPlatform = () => {
    if (newPlatform.trim() && !platforms.includes(newPlatform.trim())) {
      setPlatforms([...platforms, newPlatform.trim()])
      setNewPlatform("")
    }
  }

  const handleDeletePlatform = (platform) => {
    setPlatforms(platforms.filter((p) => p !== platform))
    if (selectedPlatform === platform) {
      setSelectedPlatform("")
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadSuccess(false)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!selectedPlatform || !selectedFile) return

    setIsUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
      setSelectedFile(null)

      // Here you would normally handle the file upload to your server
      console.log("File uploaded:", selectedFile?.name)
      console.log("Platform:", selectedPlatform)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">File Upload</h1>
        <p className="text-muted-foreground">Upload data files from different e-commerce platforms</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Platform</CardTitle>
            <CardDescription>Add a new e-commerce platform to the list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter platform name"
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
              />
              <Button onClick={handleAddPlatform}>Add</Button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Available Platforms:</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center gap-2"
                  >
                    {platform}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full hover:bg-destructive/20"
                      onClick={() => handleDeletePlatform(platform)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>Select a platform and upload your data file</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Select Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div
                  className={`
                  border-2 border-dashed rounded-lg p-6 text-center 
                  ${selectedPlatform ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}
                  ${selectedFile ? "border-primary bg-primary/5" : ""}
                `}
                >
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={!selectedPlatform}
                  />
                  <Label
                    htmlFor="file"
                    className={`flex flex-col items-center ${!selectedPlatform && "cursor-not-allowed"}`}
                  >
                    {selectedFile ? (
                      <>
                        <Check className="h-6 w-6 text-primary mb-2" />
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">CSV, XLSX, or JSON (max. 10MB)</p>
                      </>
                    )}
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!selectedPlatform || !selectedFile || isUploading}>
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>

              {uploadSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 p-2 rounded">
                  <Check className="h-4 w-4" />
                  <span>File uploaded successfully!</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
