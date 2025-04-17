"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, LinkIcon, Trash2, FileSpreadsheet, Search, FileCode, Filter, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilesLinksPage() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "amazon-sales-q1-2023.csv",
      platform: "Amazon",
      size: "2.4 MB",
      type: "csv",
      uploadedAt: "2023-06-10T15:30:00Z",
    },
    {
      id: 2,
      name: "aliexpress-product-data.xlsx",
      platform: "AliExpress",
      size: "1.8 MB",
      type: "xlsx",
      uploadedAt: "2023-06-08T11:20:00Z",
    },
    {
      id: 3,
      name: "daraz-analytics-report.json",
      platform: "Daraz",
      size: "0.5 MB",
      type: "json",
      uploadedAt: "2023-06-05T09:45:00Z",
    },
    {
      id: 4,
      name: "customer-reviews-amazon.csv",
      platform: "Amazon",
      size: "3.2 MB",
      type: "csv",
      uploadedAt: "2023-05-28T16:15:00Z",
    },
    {
      id: 5,
      name: "campaign-performance-q1.xlsx",
      platform: "All Platforms",
      size: "4.7 MB",
      type: "xlsx",
      uploadedAt: "2023-05-20T10:30:00Z",
    },
  ])

  const [links, setLinks] = useState([
    {
      id: 1,
      name: "Amazon Seller Central Dashboard",
      platform: "Amazon",
      url: "https://sellercentral.amazon.com/analytics",
      addedAt: "2023-06-11T08:30:00Z",
    },
    {
      id: 2,
      name: "AliExpress Dropshipping Center",
      platform: "AliExpress",
      url: "https://sale.aliexpress.com/dropshipping.htm",
      addedAt: "2023-06-09T14:15:00Z",
    },
    {
      id: 3,
      name: "Daraz Seller Center Analytics",
      platform: "Daraz",
      url: "https://seller.daraz.pk/analytics/dashboard",
      addedAt: "2023-06-07T11:20:00Z",
    },
    {
      id: 4,
      name: "Google Analytics E-commerce",
      platform: "All Platforms",
      url: "https://analytics.google.com/analytics/web/",
      addedAt: "2023-05-25T09:45:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedItems, setSelectedItems] = useState([])

  const getFileIcon = (type) => {
    switch (type) {
      case "csv":
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4" />
      case "json":
        return <FileCode className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDelete = (id, type) => {
    if (type === "file") {
      setFiles(files.filter((file) => file.id !== id))
    } else {
      setLinks(links.filter((link) => link.id !== id))
    }
  }

  const handleDeleteSelected = (type) => {
    if (type === "files") {
      setFiles(files.filter((file) => !selectedItems.includes(file.id)))
    } else {
      setLinks(links.filter((link) => !selectedItems.includes(link.id)))
    }
    setSelectedItems([])
  }

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.platform.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || file.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || link.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Files & Links</h1>
        <p className="text-muted-foreground">Manage your uploaded data files and external links</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files and links..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Amazon">Amazon</SelectItem>
              <SelectItem value="AliExpress">AliExpress</SelectItem>
              <SelectItem value="Daraz">Daraz</SelectItem>
              <SelectItem value="All Platforms">Combined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button>
            <span>Upload</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="files" className="space-y-4">
        <TabsList>
          <TabsTrigger value="files" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span>Files</span>
            <Badge variant="secondary" className="ml-1">
              {files.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="links" className="flex gap-2">
            <LinkIcon className="h-4 w-4" />
            <span>Links</span>
            <Badge variant="secondary" className="ml-1">
              {links.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Files</CardTitle>
                  <CardDescription>Manage your uploaded data files from various platforms</CardDescription>
                </div>
                {selectedItems.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive gap-1"
                    onClick={() => handleDeleteSelected("files")}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Selected ({selectedItems.length})</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredFiles.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems(filteredFiles.map((file) => file.id))
                                } else {
                                  setSelectedItems([])
                                }
                              }}
                              checked={selectedItems.length === filteredFiles.length && filteredFiles.length > 0}
                            />
                          </div>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                checked={selectedItems.includes(file.id)}
                                onChange={() => toggleSelectItem(file.id)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getFileIcon(file.type)}
                              <span className="font-medium">{file.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{file.platform}</Badge>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id, "file")}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No files found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedPlatform !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Upload your first data file to get started"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>External Links</CardTitle>
                  <CardDescription>Manage your saved external data source links</CardDescription>
                </div>
                {selectedItems.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive gap-1"
                    onClick={() => handleDeleteSelected("links")}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Selected ({selectedItems.length})</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredLinks.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems(filteredLinks.map((link) => link.id))
                                } else {
                                  setSelectedItems([])
                                }
                              }}
                              checked={selectedItems.length === filteredLinks.length && filteredLinks.length > 0}
                            />
                          </div>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLinks.map((link) => (
                        <TableRow key={link.id}>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                checked={selectedItems.includes(link.id)}
                                onChange={() => toggleSelectItem(link.id)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <LinkIcon className="h-4 w-4" />
                              <span className="font-medium">{link.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{link.platform}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 max-w-[200px] truncate">
                              <span className="truncate text-sm">{link.url}</span>
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(link.addedAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id, "link")}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <LinkIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No links found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedPlatform !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Add your first external link to get started"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
