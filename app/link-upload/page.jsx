"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LinkUploadPage() {
  const [platforms, setPlatforms] = useState(["Amazon", "AliExpress", "Daraz"])
  const [newPlatform, setNewPlatform] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
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

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!selectedPlatform || !linkUrl) return

    setIsUploading(true)

    // Simulate link upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)

      // Here you would normally handle the link storage to your server
      console.log("Link uploaded:", linkUrl)
      console.log("Platform:", selectedPlatform)

      setLinkUrl("")
    }, 2000)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Link Upload</h1>
        <p className="text-muted-foreground">
          Upload product post links from different e-commerce platforms for sentiment analysis
        </p>
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
            <CardTitle>Upload Link</CardTitle>
            <CardDescription>Select a platform and add your product post link for sentiment analysis</CardDescription>
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
                <Label htmlFor="link">Product Post Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="link"
                    placeholder="https://example.com/product-post"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    disabled={!selectedPlatform}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!selectedPlatform || !linkUrl || isUploading}>
                {isUploading ? "Uploading..." : "Upload Link"}
              </Button>

              {uploadSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 p-2 rounded">
                  <Check className="h-4 w-4" />
                  <span>Link saved successfully! Web scraping and sentiment analysis will begin shortly.</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
