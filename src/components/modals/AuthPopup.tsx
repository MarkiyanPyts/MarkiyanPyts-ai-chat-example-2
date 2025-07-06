import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { AuthenticationType } from '@/types';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
  authType: AuthenticationType;
  toolName?: string;
}

const authConfig = {
  oauth: {
    title: 'OAuth Authentication',
    description: 'Connect to your account using OAuth',
    icon: '🔐',
    requiresForm: false,
  },
  api_key: {
    title: 'API Key Authentication',
    description: 'Enter your API key to authenticate',
    icon: '🔑',
    requiresForm: true,
  },
  username_password: {
    title: 'Username & Password',
    description: 'Enter your credentials to authenticate',
    icon: '👤',
    requiresForm: true,
  },
};

export function AuthPopup({ isOpen, onClose, onAuthenticate, authType, toolName }: AuthPopupProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    apiKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const config = authConfig[authType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthenticate();
      onClose();
      
      // Reset form
      setCredentials({
        username: '',
        password: '',
        apiKey: '',
      });
    }, 1500);
  };

  const canSubmit = () => {
    if (authType === 'oauth') return true;
    if (authType === 'api_key') return credentials.apiKey.trim().length > 0;
    if (authType === 'username_password') return credentials.username.trim().length > 0 && credentials.password.trim().length > 0;
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <span>{config.title}</span>
              {toolName && <span className="text-sm text-system-neutral-55 block">for {toolName}</span>}
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-system-neutral-55">
            {config.description}
          </p>

          {authType === 'oauth' && (
            <Card className="p-4 bg-system-neutral-95">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{config.icon}</div>
                <div>
                  <p className="text-sm font-medium text-system-neutral-05">
                    Secure OAuth Connection
                  </p>
                  <p className="text-xs text-system-neutral-55">
                    Click authenticate to connect safely
                  </p>
                </div>
              </div>
            </Card>
          )}

          {authType === 'api_key' && (
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={credentials.apiKey}
                onChange={(e) => setCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
                className="font-mono"
                autoFocus
              />
            </div>
          )}

          {authType === 'username_password' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isAuthenticating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit() || isAuthenticating}
              className="bg-allai-blue-50 hover:bg-allai-blue-60"
            >
              {isAuthenticating ? (
                <>
                  <Lock className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Authenticate
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}