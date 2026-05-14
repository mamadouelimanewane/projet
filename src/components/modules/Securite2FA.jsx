import React, { useState, useEffect } from "react";
import { toast, dialog } from '../ui';
import { Shield, Lock, Unlock, AlertTriangle, CheckCircle, Key, Smartphone, QrCode, Copy, RefreshCw } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";

const Securite2FA = async () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(() => {
    return localStorage.getItem('projet-elite-2fa') === 'true';
  });
  const [setupPhase, setSetupPhase] = useState(0); // 0: disabled, 1: setup, 2: verify, 3: enabled
  const [secretKey, setSecretKey] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState([]);
  const [lastVerified, setLastVerified] = useState(null);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  // Générer clé secrète
  const generateSecretKey = async () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let key = '';
    for (let i = 0; i < 32; i++) {
      if (i > 0 && i % 8 === 0) key += ' ';
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  // Générer codes de backup
  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    return codes;
  };

  // TOTP vérification côté client (RFC 6238 / RFC 4226) — API WebCrypto native
  const base32Decode = (b32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0, value = 0;
    const out = [];
    for (const ch of b32.replace(/\s/g,'').toUpperCase()) {
      const idx = chars.indexOf(ch);
      if (idx === -1) continue;
      value = (value << 5) | idx; bits += 5;
      if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
    }
    return new Uint8Array(out);
  };

  const verifyCode = async (inputCode) => {
    if (!/^\d{6}$/.test(inputCode)) return false;
    const keyBytes = base32Decode(secretKey);
    for (let drift = -1; drift <= 1; drift++) {
      const counter = Math.floor(Date.now() / 1000 / 30) + drift;
      const cb = new Uint8Array(8);
      let c = counter;
      for (let i = 7; i >= 0; i--) { cb[i] = c & 0xff; c = Math.floor(c / 256); }
      const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
      const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, cb));
      const off = sig[19] & 0xf;
      const code = ((sig[off]&0x7f)<<24|sig[off+1]<<16|sig[off+2]<<8|sig[off+3]) % 1000000;
      if (code.toString().padStart(6,'0') === inputCode) return true;
    }
    return false;
  };

  // Activer 2FA
  const enable2FA = () => {
    const key = generateSecretKey();
    setSecretKey(key);
    setBackupCodes(generateBackupCodes());
    setSetupPhase(1);
  };

  // Vérifier et finaliser
  const finalizeSetup = async () => {
    const valid = await verifyCode(verificationCode);
    if (!valid) {
      toast.error("Code invalide. Vérifiez que l'heure de votre téléphone est synchronisée et réessayez.");
      return;
    }

    setTwoFAEnabled(true);
    setSetupPhase(3);
    localStorage.setItem('projet-elite-2fa', 'true');
    localStorage.setItem('projet-elite-2fa-key', secretKey);
    localStorage.setItem('projet-elite-2fa-backup', JSON.stringify(backupCodes));
    setLastVerified(new Date().toISOString());
  };

  // Désactiver 2FA
  const disable2FA = async () => {
    if (await dialog.confirm("Êtes-vous sûr de vouloir désactiver la 2FA ?")) {
      setTwoFAEnabled(false);
      setSetupPhase(0);
      localStorage.removeItem('projet-elite-2fa');
      localStorage.removeItem('projet-elite-2fa-key');
      localStorage.removeItem('projet-elite-2fa-backup');
    }
  };

  // Copier clé
  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ''));
    toast.success("Clé copiée !");
  };

  // Copier code backup
  const copyBackupCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copié !");
  };

  // Régénérer codes backup
  const regenerateBackupCodes = () => {
    const newCodes = generateBackupCodes();
    setBackupCodes(newCodes);
    localStorage.setItem('projet-elite-2fa-backup', JSON.stringify(newCodes));
  };

  // Afficher QR Code (simulation avec URL)
  const getQRCodeURL = () => {
    const account = "user@projetelite.com";
    const issuer = "Projet%20%C3%89lite";
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/${issuer}:${account}?secret=${secretKey.replace(/\s/g, '')}&issuer=${issuer}`;
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Sécurité - Authentification 2FA" 
        subtitle="Double authentification pour sécuriser votre compte"
      />

      {/* Statut actuel */}
      <Card className={`p-6 rounded-2xl border-2 ${
        twoFAEnabled 
          ? 'bg-emerald-600/10 border-emerald-500/50' 
          : 'bg-orange-600/10 border-orange-500/50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {twoFAEnabled ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">2FA Activée</h3>
                  <p className="text-sm text-slate-300">Votre compte est sécurisé</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Dernière vérification : {lastVerified ? new Date(lastVerified).toLocaleString('fr-FR') : "Jamais"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-400">2FA Désactivée</h3>
                  <p className="text-sm text-slate-300">Votre compte est vulnérable</p>
                </div>
              </>
            )}
          </div>

          {twoFAEnabled ? (
            <Btn variant="ghost" onClick={disable2FA}>
              <Unlock className="w-4 h-4 mr-2" />
              Désactiver
            </Btn>
          ) : (
            <Btn onClick={enable2FA}>
              <Lock className="w-4 h-4 mr-2" />
              Activer 2FA
            </Btn>
          )}
        </div>
      </Card>

      {/* Setup 2FA */}
      {setupPhase === 1 && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-400" />
            Étape 1 : Configurez votre application d'authentification
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-300 mb-3">
                1. Installez Google Authenticator, Authy ou Microsoft Authenticator sur votre téléphone
              </p>
              <p className="text-sm text-slate-300 mb-3">
                2. Scannez ce QR code :
              </p>
              <div className="bg-white p-4 rounded-xl inline-block">
                <img 
                  src={getQRCodeURL()} 
                  alt="QR Code 2FA"
                  className="w-48 h-48"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-300 mb-3">
                3. Ou entrez manuellement cette clé :
              </p>
              <div className="flex items-center gap-3">
                <code className="flex-1 p-3 bg-slate-900 rounded-lg text-indigo-400 font-mono text-sm">
                  {secretKey}
                </code>
                <Btn size="sm" onClick={copySecretKey}>
                  <Copy className="w-4 h-4" />
                </Btn>
              </div>
            </div>

            <Btn onClick={() => setSetupPhase(2)} className="w-full">
              Suivant
              <CheckCircle className="w-4 h-4 ml-2" />
            </Btn>
          </div>
        </Card>
      )}

      {/* Vérification */}
      {setupPhase === 2 && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" />
            Étape 2 : Vérifiez le code
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-300 mb-3">
                Entrez le code à 6 chiffres affiché dans votre application :
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                className="w-full px-6 py-4 bg-slate-900 border-2 border-slate-700 rounded-xl text-white text-center text-3xl font-mono tracking-widest focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <Btn onClick={finalizeSetup} className="flex-1" disabled={verificationCode.length !== 6}>
                <Shield className="w-4 h-4 mr-2" />
                Activer 2FA
              </Btn>
              <Btn variant="ghost" onClick={() => setSetupPhase(1)}>
                Retour
              </Btn>
            </div>
          </div>
        </Card>
      )}

      {/* 2FA activée - Codes backup */}
      {setupPhase === 3 && (
        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Codes de Backup
            </h3>
            <button
              onClick={() => setShowBackupCodes(!showBackupCodes)}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              {showBackupCodes ? "Masquer" : "Afficher"}
            </button>
          </div>

          {showBackupCodes && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-600/10 border border-yellow-500/30 rounded-xl">
                <p className="text-sm text-yellow-400">
                  ⚠️ Conservez ces codes en sécurité ! Ils permettent d'accéder à votre compte si vous perdez votre téléphone.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {backupCodes.map((code, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <code className="text-sm text-white font-mono">{code}</code>
                    <button
                      onClick={() => copyBackupCode(code)}
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <Btn variant="ghost" onClick={regenerateBackupCodes} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Régénérer les codes
              </Btn>
            </div>
          )}
        </Card>
      )}

      {/* Informations sécurité */}
      <Card className="p-6 glass-card rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          Pourquoi activer la 2FA ?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              titre: "Protection renforcée",
              desc: "Même si votre mot de passe est volé, votre compte reste sécurisé"
            },
            {
              titre: "Authentification temps réel",
              desc: "Code généré toutes les 30 secondes, impossible à deviner"
            },
            {
              titre: "Compatible universel",
              desc: "Fonctionne avec Google Authenticator, Authy, Microsoft"
            },
            {
              titre: "Codes de secours",
              desc: "8 codes de backup pour récupérer l'accès si besoin"
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="font-medium text-white mb-1">{item.titre}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Securite2FA;
