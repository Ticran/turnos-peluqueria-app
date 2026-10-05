import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { FormError } from "@/components/ui/Field";
import { uploadImage } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// Foto de perfil del usuario logueado: la ven los clientes al elegir profesional
export default function MyPhoto({ businessId }) {
  const { user, updateUser } = useAuth();
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const updated = await uploadImage(`/api/users/${user.id}/business/${businessId}/photo`, file);
      updateUser({ photoUrl: updated.photoUrl });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-5">
      <Avatar name={user.name} photoUrl={user.photoUrl} className="w-16 h-16 text-lg" />
      <div className="space-y-1">
        <h2 className="font-medium text-slate-900">Tu foto</h2>
        <p className="text-xs text-slate-500">Los clientes la ven al elegir profesional. JPG, PNG o WEBP de hasta 5 MB.</p>
        <label className="inline-block text-sm font-medium text-[#800020] hover:underline cursor-pointer">
          {uploading ? "Subiendo..." : "Cambiar foto"}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      <div className="w-full"><FormError>{error}</FormError></div>
    </div>
  );
}
