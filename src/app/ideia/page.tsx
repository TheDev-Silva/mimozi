"use client";

import React, { useState } from "react";
import {
  LucideUploadCloud,
  ArrowLeft,
  Send,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Phone,
  AlertCircle,
  Layers,
  Copy,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface UploadedFile {
  id: string;
  url: string;
  name: string;
}

export default function IdeaDetailsPage() {
  const [photos, setPhotos] = useState<UploadedFile[]>([]);
  const [singlePhoto, setSinglePhoto] = useState<UploadedFile | null>(null);
  const [mode, setMode] = useState<"multiple" | "single">("multiple");
  const [description, setDescription] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(20);
  const [shape, setShape] = useState<"redondo" | "quadrado">("redondo");
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState<boolean>(false);

  const MAX_A4_CAPACITY = 20;
  const isLargeVolume = quantity > MAX_A4_CAPACITY;

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    const newFiles: UploadedFile[] = filesArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((prev) => {
      const updated = [...prev, ...newFiles].slice(0, MAX_A4_CAPACITY);
      if (updated.length > 0) setWarningMessage(null);
      return updated;
    });
  };

  const handleSingleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
    };
    setSinglePhoto(newFile);
    setWarningMessage(null);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLargeVolume) {
      if (mode === "multiple" && photos.length === 0) {
        setWarningMessage(
          "Por favor, envie pelo menos uma foto para o projeto.",
        );
        return;
      }
      if (mode === "single" && !singlePhoto) {
        setWarningMessage(
          "Por favor, envie a foto que será aplicada nos ímãs.",
        );
        return;
      }
    }

    setWarningMessage(null);

    const tipoEnvio = isLargeVolume
      ? "Grande Volume / Atacado (Envio de fotos via Link Externo)"
      : mode === "multiple"
        ? "Várias Imagens Diferentes"
        : "Foto Única Repetida";

    const textoMensagem = encodeURIComponent(
      `💖 *NOVO PROJETO MIMOZI* 💖\n\n` +
        `• *Formato:* Ímã ${shape} (5cm)\n` +
        `• *Quantidade Total:* ${quantity} unidades\n` +
        `• *Tipo de Pedido:* ${tipoEnvio}\n\n` +
        `📝 *Detalhes/Instruções:* ${description || "Nenhum detalhe extra informado."}\n\n` +
        `📞 *Contato WhatsApp:* ${whatsapp}`,
    );

    const seuNumeroWhatsApp = "5541997759542";

    window.open(
      `https://wa.me/${seuNumeroWhatsApp}?text=${textoMensagem}`,
      "_blank",
    );

    setIsSent(true);
  };

  return (
    <main className="relative flex flex-col md:flex-row w-full justify-center px-4 md:px-12 overflow-hidden font-fredoka py-4 gap-8">
      {/* SE O PROJETO FOI ENVIADO, EXIBE APENAS A TELA DE SUCESSO CENTRALIZADA */}
      {isSent ? (
        <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-primary/20 text-center py-12 space-y-6 my-auto">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold font-fredoka text-gray-800">
            Projeto Enviado com Sucesso!
          </h2>
          <div className="bg-secondary/20 border border-secondary/40 p-5 rounded-2xl text-xs text-gray-700 space-y-2">
            <p className="font-bold text-primary text-sm">
              WhatsApp Aberto com as informações para {whatsapp}:
            </p>
            <p className="italic leading-relaxed">
              &quot;Olá! Recebemos seu projeto de {quantity} ímãs na Mimozi. Em
              breve nossa equipe enviará o resultado da proposta e a prévia da
              arte! 💖&quot;
            </p>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-primary/80 transition-colors inline-block shadow-md"
            >
              Voltar para a Home
            </Link>
          </div>
        </div>
      ) : (
        /* SE NÃO FOI ENVIADO, EXIBE O FORMULÁRIO E O PREVIEW LADO A LADO */
        <>
          {/* COLUNA ESQUERDA: FORMULÁRIO */}
          <div className="relative mx-auto flex w-full max-w-8xl px-4 py-4 pt-4 flex-col gap-8">
            <div className="flex w-full justify-center flex-col gap-0 pr-0 md:pr-4">
              <div className="pb-8">
                <Link
                  href="/personalizer"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
                >
                  <ArrowLeft size={16} /> Voltar para o Personalizador
                </Link>
              </div>

              <div className="w-full text-center">
                <h1 className="text-2xl md:text-3xl font-fredoka text-gray-800">
                  Conte a Sua Ideia de Foto-Ímã
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Defina a quantidade desejada e nossa equipe cuida de toda a
                  produção para você!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                {/* Formato e Quantidade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <div>
                    <label className="flex flex-col text-xs font-semibold text-gray-700 uppercase mb-2">
                      Formato do Ímã (5cm)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setShape("redondo")}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                          shape === "redondo"
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        Redondo
                      </button>
                      <button
                        type="button"
                        onClick={() => setShape("quadrado")}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                          shape === "quadrado"
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        Quadrado
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex flex-col text-xs font-semibold text-gray-700 uppercase mb-2">
                      Quantidade Total (Mín. 10)
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(10, Number(e.target.value)))
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-primary font-bold"
                    />
                  </div>
                </div>

                {/* CONDIÇÃO DE GRANDE VOLUME */}
                {isLargeVolume ? (
                  <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-2xl space-y-3 shadow-sm animate-fade-in">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <AlertTriangle
                        size={20}
                        className="text-amber-600 shrink-0"
                      />
                      <span>
                        Atenção: Pedido de Grande Volume ({quantity} unidades)
                      </span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Para volumes acima de 20 unidades, o carregamento
                      individual de fotos pelo site fica desativado. Organize
                      suas imagens em uma pasta ou link (Google Drive,
                      WeTransfer) e envie nos detalhes.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col text-xs font-semibold text-gray-700 uppercase mb-2">
                      1. Como deseja usar suas fotos?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMode("multiple")}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          mode === "multiple"
                            ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <Layers
                          size={18}
                          className={
                            mode === "multiple"
                              ? "text-primary mt-0.5"
                              : "text-gray-400 mt-0.5"
                          }
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-800">
                            Várias Imagens
                          </span>
                          <span className="text-[10px] text-gray-500">
                            Enviar fotos diferentes (até 20)
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMode("single")}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          mode === "single"
                            ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <Copy
                          size={18}
                          className={
                            mode === "single"
                              ? "text-primary mt-0.5"
                              : "text-gray-400 mt-0.5"
                          }
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-800">
                            Foto Única
                          </span>
                          <span className="text-[10px] text-gray-500">
                            Repetir a mesma foto em todos
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* UPLOAD CONDICIONAL */}
                {!isLargeVolume && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        2. Envie suas Fotos
                      </label>
                      <span className="text-[11px] text-gray-400">
                        {mode === "multiple"
                          ? `(${photos.length} de até ${quantity} na folha)`
                          : "(1 foto principal)"}
                      </span>
                    </div>

                    {mode === "multiple" ? (
                      <label className="cursor-pointer flex flex-row gap-4 items-center justify-center w-full py-3 border-2 border-dashed border-primary/40 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors p-4 text-center">
                        <LucideUploadCloud
                          size={24}
                          className="text-primary shrink-0"
                        />
                        <span className="text-xs font-medium text-gray-700">
                          Clique para selecionar as fotos (Máx. {quantity})
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleMultipleUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <label className="cursor-pointer flex flex-row gap-4 items-center justify-center w-full py-3 border-2 border-dashed border-primary/40 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors p-4 text-center">
                        <LucideUploadCloud
                          size={24}
                          className="text-primary shrink-0"
                        />
                        <span className="text-xs font-medium text-gray-700">
                          {singlePhoto
                            ? "Foto única carregada ✔ (Clique para alterar)"
                            : "Clique para selecionar a foto única"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSingleUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}

                {/* CAMPO DE DETALHES */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5 items-center gap-1.5">
                    <MessageSquare
                      size={14}
                      className="text-primary inline mr-1"
                    />
                    {isLargeVolume
                      ? "3. Cole o link do seu Drive/WeTransfer ou detalhes *"
                      : "3. Explique os detalhes ou distribuição das fotos *"}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (e.target.value.trim() !== "") setWarningMessage(null);
                    }}
                    placeholder={
                      isLargeVolume
                        ? "Ex: Segue o link com as 150 fotos no Google Drive..."
                        : "Ex: Quero que a foto 1 repita mais vezes..."
                    }
                    className="w-full bg-white border border-gray-200 rounded-2xl p-3.5 text-sm text-gray-800 focus:outline-none focus:border-primary shadow-sm"
                    required
                  />
                </div>

                {warningMessage && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2 text-amber-800 text-xs">
                    <AlertCircle
                      size={16}
                      className="shrink-0 text-amber-600"
                    />
                    <span>{warningMessage}</span>
                  </div>
                )}

                {/* WHATSAPP */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5 items-center gap-1.5">
                    <Phone size={14} className="text-primary inline mr-1" />
                    4. Seu WhatsApp
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(41) 99999-9999"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary shadow-sm"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3.5 rounded-full font-medium hover:bg-primary/80 transition-colors shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} /> Enviar Projeto Completo para a Mimozi
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* COLUNA DIREITA: PREVIEW DA FOLHA A4 (SOME QUANDO ISCENT FOR TRUE) */}
          <div className="relative mx-auto flex w-full max-w-8xl px-4 py-4 pt-4 flex-col gap-6 border border-primary/10 rounded-2xl bg-primary/5 shadow-sm">
            <h1 className="text-center md:text-2xl text-lg font-fredoka text-primary">
              Veja Como seu Projeto pode ficar
            </h1>

            <div className="flex w-full flex-col p-4 bg-white rounded-xl relative border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-fredoka text-gray-400 text-[10px]">
                  {isLargeVolume
                    ? `Modo Atacado / Grande Lote (${quantity} un.)`
                    : `Padrão A4 Definido (${quantity} espaços ativos)`}
                </h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {isLargeVolume
                    ? "Atacado 📦"
                    : mode === "multiple"
                      ? `${photos.length}/${quantity} Fotos`
                      : singlePhoto
                        ? "Foto única aplicada"
                        : "Aguardando foto"}
                </span>
              </div>

              <div className="w-full shadow-sm rounded-lg overflow-hidden border border-gray-400/20 p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-55">
                {isLargeVolume ? (
                  <div className="text-center py-10 px-4 space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary font-bold text-lg">
                      📦
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">
                      Grande Volume Selecionado
                    </h4>
                    <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                      A prévia visual por folha A4 fica otimizada até 20
                      unidades. Para {quantity} ímãs, o envio é combinado
                      diretamente com a equipe via link externo ou pasta.
                    </p>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-4 sm:grid-cols-4 gap-2 items-start">
                    {Array.from({ length: quantity }).map((_, index) => {
                      const currentPhoto =
                        mode === "multiple" ? photos[index] : singlePhoto;

                      return (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden aspect-square bg-white shadow-sm border border-gray-200 p-1 flex items-center justify-center"
                        >
                          {currentPhoto ? (
                            <>
                              <img
                                src={currentPhoto.url}
                                alt="Envio"
                                className={`w-full h-full object-cover ${shape === "redondo" ? "rounded-full border border-gray-400 p-0.5" : "rounded-md border border-gray-400 p-0.5"}`}
                              />
                              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1 rounded z-10">
                                #{index + 1}
                              </span>
                              {mode === "multiple" && (
                                <button
                                  type="button"
                                  onClick={() => removePhoto(currentPhoto.id)}
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                                  title="Remover"
                                >
                                  <Trash2 size={10} />
                                </button>
                              )}
                            </>
                          ) : (
                            <span className="text-[9px] text-gray-300 font-fredoka">
                              #{index + 1}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
