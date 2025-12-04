"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { useClients } from "@/hooks/use-clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import type { Client } from "@/lib/types";

interface ClientFormProps {
  formData: typeof initialFormData;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  onCancel: () => void;
  isEditing: boolean;
}

const initialFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  logo: "",
  industry: "",
  size: "MEDIUM",
  notes: "",
  isFeatured: false,
  isActive: true,
};

function ClientForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  onCancel,
  isEditing,
}: ClientFormProps) {
  return (
    <div className="h-full flex flex-col">
      <form onSubmit={onSubmit} className="flex-1 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name *
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
              required
              className="w-full"
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-sm font-medium">
              Contact Name
            </Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactName: e.target.value,
                }))
              }
              className="w-full"
              placeholder="Enter contact person name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full"
              placeholder="contact@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full"
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium">
              Website
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, website: e.target.value }))
              }
              className="w-full"
              placeholder="https://company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm font-medium">
              Logo URL
            </Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, logo: e.target.value }))
              }
              className="w-full"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              Industry
            </Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, industry: e.target.value }))
              }
              className="w-full"
              placeholder="Technology, Healthcare, Finance, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size" className="text-sm font-medium">
              Company Size
            </Label>
            <Select
              value={formData.size}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, size: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STARTUP">Startup (1-10)</SelectItem>
                <SelectItem value="SMALL">Small (11-50)</SelectItem>
                <SelectItem value="MEDIUM">Medium (51-500)</SelectItem>
                <SelectItem value="LARGE">Large (501-5000)</SelectItem>
                <SelectItem value="ENTERPRISE">Enterprise (5000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Notes
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            rows={3}
            className="w-full resize-none"
            placeholder="Additional notes about this client..."
          />
        </div>

        <div className="flex items-center justify-center space-x-8 py-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isFeatured: checked }))
              }
            />
            <Label
              htmlFor="isFeatured"
              className="text-sm font-medium cursor-pointer"
            >
              Featured on Homepage
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isActive: checked }))
              }
            />
            <Label
              htmlFor="isActive"
              className="text-sm font-medium cursor-pointer"
            >
              Active Status
            </Label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="min-w-[100px]">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : isEditing ? (
              "Update Client"
            ) : (
              "Create Client"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ClientManagement() {
  const {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    toggleFeatured,
    toggleActive,
    refresh,
  } = useClients({ autoFetch: true });

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingClient) {
      const result = await updateClient(editingClient.id, formData);
      if (result.success) {
        setEditingClient(null);
        resetForm();
      }
    } else {
      const result = await createClient(formData);
      if (result.success) {
        setShowCreateDialog(false);
        resetForm();
      }
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      companyName: client.companyName,
      contactName: client.contactName || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      website: client.website || "",
      logo: client.logo || "",
      industry: client.industry || "",
      size: client.size || "MEDIUM",
      notes: client.notes || "",
      isFeatured: client.isFeatured,
      isActive: client.isActive,
    });
  };

  const handleDelete = async (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.companyName}?`)) {
      await deleteClient(client.id);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.contactName &&
        client.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.industry &&
        client.industry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Client Management</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-4xl h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-2xl font-bold">
                Create New Client
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-6">
              <ClientForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
                onCancel={() => {
                  resetForm();
                  setShowCreateDialog(false);
                }}
                isEditing={false}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <h4 className="font-semibold">Error loading clients:</h4>
          <p>{error}</p>
          <button
            onClick={refresh}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline" onClick={refresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredClients.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "No clients match your search."
                    : "No clients found."}
                </p>
                {!searchTerm && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">
                      Add your first client to get started!
                    </p>
                    <Button
                      onClick={() => setShowCreateDialog(true)}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {client.logo && (
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <motion.div
                              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 overflow-hidden relative flex items-center justify-center p-1.5"
                              style={{
                                boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 12px rgba(59, 130, 246, 0.4), 0 4px 15px rgba(0, 0, 0, 0.15)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              }}
                              whileHover={{
                                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.4), 0 0 18px rgba(59, 130, 246, 0.5), 0 6px 20px rgba(0, 0, 0, 0.2)",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={client.logo}
                                alt={client.companyName}
                                width={36}
                                height={36}
                                className="object-contain w-full h-full"
                              />
                            </motion.div>
                          </motion.div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">
                            {client.companyName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {client.contactName} • {client.email}
                          </p>
                          {client.industry && (
                            <p className="text-xs text-muted-foreground">
                              {client.industry}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {client.isFeatured && (
                          <Badge variant="secondary">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge
                          variant={client.isActive ? "default" : "secondary"}
                        >
                          {client.isActive ? "Active" : "Inactive"}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toggleFeatured(client.id, !client.isFeatured)
                          }
                        >
                          <Star
                            className={`h-4 w-4 ${
                              client.isFeatured ? "fill-current" : ""
                            }`}
                          />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toggleActive(client.id, !client.isActive)
                          }
                        >
                          {client.isActive ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(client)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(client)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Edit Dialog (controlled) */}
      <Dialog
        open={!!editingClient}
        onOpenChange={(open) => !open && setEditingClient(null)}
      >
        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold">
              Edit Client: {editingClient?.companyName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <ClientForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
              onCancel={() => {
                setEditingClient(null);
                resetForm();
              }}
              isEditing={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
