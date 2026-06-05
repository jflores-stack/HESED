import { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import SignatureCanvas from 'react-signature-canvas';
import { Camera, Upload, X, Check, ScanText, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function EnrollmentForm() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const [loadingOcr, setLoadingOcr] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    kidName: '',
    birthDate: '',
    age: '',
    gender: '',
    address: '',
    school: '',
    grade: '',
    shift: '',
    hasDisease: false,
    diseaseDetails: '',
    hasAllergies: false,
    allergyDetails: '',
    medications: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    guardianName: '',
    guardianId: '',
    guardianRelation: '',
    guardianWorks: false,
    guardianPhone: '',
    guardianAddress: '',
  });

  const [kidPhoto, setKidPhoto] = useState<string | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingOcr(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const response = await fetch('/api/scan-form', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ imageBase64: base64 })
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, ...data }));
        } else {
          alert('Error al escanear el formulario.');
        }
        setLoadingOcr(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setLoadingOcr(false);
      alert('Error en el escaneo');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKidPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setSignatureData(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    }
    // You'd normally send this to a backend database, but here we'll just show success
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
        <Navigation />
        <div className="flex-1 max-w-3xl mx-auto w-full p-6 mt-10">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center sm:p-12">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Inscripción Completada</h2>
            <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
              El formulario ha sido enviado con éxito. Gracias por completar la inscripción al Proyecto Hesed.
            </p>
            <button onClick={() => setSuccess(false)} className="bg-emerald-600 text-white px-8 py-3 rounded-md font-medium hover:bg-emerald-700 transition-colors">
              Volver al formulario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans mb-20">
      <Navigation />
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 mt-10">
        
        <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-2">PROYECTO HESED</h1>
            <h2 className="text-lg sm:text-xl text-neutral-600 mb-8">HOJA DE INSCRIPCIÓN</h2>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-left">
               <div className="text-center sm:text-left">
                 <h3 className="font-bold text-emerald-800">¿Tienes un formulario físico lleno?</h3>
                 <p className="text-xs sm:text-sm text-emerald-700 mt-1">Sube una foto del formulario y usaremos IA para llenarlo automáticamente.</p>
               </div>
               <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFormScan} />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loadingOcr}
                    className="flex text-sm w-full sm:w-auto justify-center items-center gap-2 bg-white border border-emerald-300 text-emerald-700 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-emerald-50 transition-colors disabled:opacity-50"
                  >
                    {loadingOcr ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanText className="w-5 h-5" />}
                    {loadingOcr ? 'Escaneando...' : 'Escanear Formulario'}
                  </button>
               </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Foto del Niño */}
            <section className="flex flex-col sm:flex-row gap-6 items-start">
               <div className="w-32 h-40 border-2 border-dashed border-neutral-300 rounded flex flex-col items-center justify-center bg-neutral-50 relative overflow-hidden flex-shrink-0 group">
                  {kidPhoto ? (
                    <>
                      <img src={kidPhoto} alt="Foto del Niño" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setKidPhoto(null)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="text-neutral-400 text-center p-2">
                       <Camera className="w-8 h-8 mx-auto mb-2" />
                       <span className="text-xs font-medium uppercase">Fotografía<br/>del niño/a</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Subir foto del niño" />
               </div>
               <div className="flex-1 mt-4 sm:mt-0">
                  <p className="text-sm text-neutral-500 mb-2">Por favor adjunta una foto reciente del niño o niña (tamaño carnet). Puedes omitir este paso y pegarla luego en físico si lo prefieres.</p>
               </div>
            </section>

            {/* I. Datos Generales */}
            <section>
              <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-wide">I. Datos Generales del Niño/a</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre completo:</label>
                    <input required type="text" name="kidName" value={formData.kidName} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Fecha de nacimiento:</label>
                    <input type="text" placeholder="dd / mm / aaaa" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Edad:</label>
                      <input type="text" name="age" value={formData.age} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Sexo:</label>
                      <div className="flex gap-4">
                         <label className="inline-flex items-center">
                            <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleInputChange} className="text-emerald-600 focus:ring-emerald-500" />
                            <span className="ml-2">M</span>
                         </label>
                         <label className="inline-flex items-center">
                            <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleInputChange} className="text-emerald-600 focus:ring-emerald-500" />
                            <span className="ml-2">F</span>
                         </label>
                      </div>
                   </div>
                 </div>
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Dirección:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
              </div>
            </section>

            {/* II. Información Educativa */}
            <section>
              <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-wide">II. Información Educativa</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Centro educativo:</label>
                    <input type="text" name="school" value={formData.school} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Curso / Grado:</label>
                    <input type="text" name="grade" value={formData.grade} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Jornada:</label>
                    <div className="flex gap-4">
                       <label className="inline-flex items-center">
                          <input type="radio" name="shift" value="Mañana" checked={formData.shift === 'Mañana'} onChange={handleInputChange} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">Mañana</span>
                       </label>
                       <label className="inline-flex items-center">
                          <input type="radio" name="shift" value="Tarde" checked={formData.shift === 'Tarde'} onChange={handleInputChange} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">Tarde</span>
                       </label>
                    </div>
                 </div>
              </div>
            </section>

            {/* III. Información de Salud */}
            <section>
              <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-wide">III. Información de Salud</h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">¿Presenta alguna enfermedad diagnosticada?</label>
                    <div className="flex gap-4 mb-2">
                       <label className="inline-flex items-center">
                          <input type="radio" name="hasDisease" value="true" checked={formData.hasDisease === true} onChange={() => setFormData({...formData, hasDisease: true})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">Sí</span>
                       </label>
                       <label className="inline-flex items-center">
                          <input type="radio" name="hasDisease" value="false" checked={formData.hasDisease === false} onChange={() => setFormData({...formData, hasDisease: false})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">No</span>
                       </label>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-neutral-600">Detalle:</span>
                       <input disabled={!formData.hasDisease} type="text" name="diseaseDetails" value={formData.diseaseDetails} onChange={handleInputChange} className="flex-1 border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-1 outline-none bg-transparent disabled:opacity-50" />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">¿Alergias alimentarias o médicas?</label>
                    <div className="flex gap-4 mb-2">
                       <label className="inline-flex items-center">
                          <input type="radio" name="hasAllergies" value="true" checked={formData.hasAllergies === true} onChange={() => setFormData({...formData, hasAllergies: true})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">Sí</span>
                       </label>
                       <label className="inline-flex items-center">
                          <input type="radio" name="hasAllergies" value="false" checked={formData.hasAllergies === false} onChange={() => setFormData({...formData, hasAllergies: false})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">No</span>
                       </label>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-neutral-600">Detalle:</span>
                       <input disabled={!formData.hasAllergies} type="text" name="allergyDetails" value={formData.allergyDetails} onChange={handleInputChange} className="flex-1 border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-1 outline-none bg-transparent disabled:opacity-50" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Medicamentos permanentes:</label>
                    <input type="text" name="medications" value={formData.medications} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
              </div>
            </section>

            {/* IV. Datos de Padres */}
            <section>
              <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-wide">IV. Datos de los Padres o Representantes Legales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre del padre o tutor:</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Teléfono:</label>
                    <input type="text" name="fatherPhone" value={formData.fatherPhone} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre de la madre o tutora:</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Teléfono:</label>
                    <input type="text" name="motherPhone" value={formData.motherPhone} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
              </div>
            </section>

            {/* V. Encargado Legal */}
            <section>
              <h3 className="text-lg font-bold text-neutral-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase tracking-wide">V. Encargado/a Legal ante el Proyecto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre completo:</label>
                    <input type="text" name="guardianName" value={formData.guardianName} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Número de identidad:</label>
                    <input type="text" name="guardianId" value={formData.guardianId} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Parentesco:</label>
                    <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Trabaja:</label>
                    <div className="flex gap-4">
                       <label className="inline-flex items-center">
                          <input type="radio" name="guardianWorks" value="true" checked={formData.guardianWorks === true} onChange={() => setFormData({...formData, guardianWorks: true})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">Sí</span>
                       </label>
                       <label className="inline-flex items-center">
                          <input type="radio" name="guardianWorks" value="false" checked={formData.guardianWorks === false} onChange={() => setFormData({...formData, guardianWorks: false})} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="ml-2">No</span>
                       </label>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Teléfono:</label>
                    <input type="text" name="guardianPhone" value={formData.guardianPhone} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
                 <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Dirección:</label>
                    <input type="text" name="guardianAddress" value={formData.guardianAddress} onChange={handleInputChange} className="w-full border-b border-neutral-400 focus:border-emerald-500 focus:ring-0 px-0 py-2 outline-none bg-transparent" />
                 </div>
              </div>
            </section>

            {/* Terms and Signature */}
            <section className="bg-neutral-100 p-6 rounded-xl border border-neutral-200 mt-10 text-sm text-neutral-800 leading-relaxed text-justify">
               <h3 className="text-center font-bold text-lg mb-6 uppercase">Autorización, Compromiso y Aceptación de Normas</h3>
               <p className="mb-4">
                 Yo, <strong>{formData.guardianName || '________________________'}</strong>, mayor de edad, con Tarjeta de Identidad <strong>{formData.guardianId || '________________________'}</strong>, actuando en mi condición de padre, madre o representante legal del niño/a <strong>{formData.kidName || '________________________'}</strong> <strong>AUTORIZO</strong> su participación en el Proyecto Hesed y declaro que conozco, acepto y me comprometo a cumplir las disposiciones que se detallan a continuación:
               </p>
               <ol className="list-decimal pl-6 space-y-2 mb-6">
                 <li>Me comprometo a garantizar la asistencia regular del niño/a a las actividades del proyecto. La acumulación de más de cuatro (4) inasistencias injustificadas <strong>podrá constituir causal de exclusión</strong>, previo análisis del caso, registro administrativo y notificación al representante legal.</li>
                 <li>Me comprometo a asistir a las reuniones, capacitaciones o actividades informativas a las que sean convocados los padres, madres o representantes legales por parte de la organización ejecutora del proyecto.</li>
                 <li>Reconozco que la participación del niño/a en el proyecto no sustituye ni limita mi responsabilidad como encargado/a principal de su educación, cuidado y formación integral, siendo el proyecto un apoyo complementario a dicho proceso.</li>
                 <li>Los padres, madres, representantes legales y los niños/as deberán mantener una conducta basada en el respeto, el orden y la responsabilidad durante la ejecución del proyecto. <strong>El incumplimiento de esta disposición podrá dar lugar a acciones administrativas conforme a la normativa interna de la organización y, de persistir la situación, a la exclusión del niño/a del proyecto</strong>, garantizando la debida información al representante legal.</li>
               </ol>

               <h4 className="font-bold mb-2">AUTORIZACIÓN PARA USO DE IMAGEN</h4>
               <p className="mb-4 text-xs">
                 En cumplimiento de lo establecido en la <strong>Constitución de la República de Honduras</strong> y el <strong>Código de la Niñez y la Adolescencia</strong>, <strong>AUTORIZO de forma expresa</strong> a la organización ejecutora del Proyecto Hesed a captar, reproducir y utilizar fotografías y/o material audiovisual en los que aparezca el niño/a, obtenidos exclusivamente durante el desarrollo de las actividades del proyecto, <strong>con fines educativos, informativos, institucionales y de difusión no comercial</strong>, a través de medios digitales, redes sociales institucionales y material impreso.
               </p>
               <p className="mb-8 text-xs">
                 La organización se compromete a garantizar un uso adecuado, responsable y respetuoso de la imagen del niño/a, evitando cualquier utilización que pueda vulnerar su dignidad, integridad o derechos fundamentales. La presente autorización es de carácter gratuito y podrá ser revocada mediante solicitud escrita presentada por el representante legal.
               </p>

               <p className="mb-8 font-medium italic text-center">
                 Declaro que la información proporcionada es veraz, que he leído, comprendido y aceptado el contenido del presente documento, el cual firmo para los fines legales y administrativos correspondientes.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                   <label className="block text-sm font-bold text-neutral-800 mb-2">Firma Digital</label>
                   <div className="bg-white border-2 border-neutral-300 rounded shadow-inner">
                     <SignatureCanvas 
                        ref={sigCanvas} 
                        penColor="currentColor" 
                        canvasProps={{ className: 'w-full h-40 cursor-crosshair' }} 
                     />
                   </div>
                   <div className="flex justify-end mt-2">
                      <button type="button" onClick={clearSignature} className="text-xs text-neutral-500 hover:text-red-500">Limpiar Firma</button>
                   </div>
                 </div>
                 
                 <div className="flex flex-col justify-end space-y-6 pt-4 md:pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                       <span className="font-medium">Dado en Tegucigalpa M.D.C.</span>
                       <div className="flex-1 border-b border-neutral-400 hidden sm:block"></div>
                    </div>
                    <div className="flex items-end gap-2">
                       <span className="font-medium">Fecha:</span>
                       <input type="text" className="w-full sm:w-32 border-b border-neutral-400 bg-transparent px-1 min-w-0" defaultValue={new Date().toLocaleDateString('es-HN')} />
                    </div>
                 </div>
               </div>

            </section>

            <div className="flex justify-end pt-6 border-t border-neutral-200">
               <button type="submit" className="w-full sm:w-auto justify-center bg-emerald-600 text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-emerald-700 transition-colors duration-200 text-lg flex items-center gap-2">
                 <Check className="w-6 h-6" />
                 Enviar Inscripción
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
