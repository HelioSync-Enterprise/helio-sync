# Roadmap do Dashboard HelioSync

## Objetivo Final
- Dashboard funcional com monitoramento vivo, histórico, gestão de dispositivos e pareamento via QR.

## Fase 1 - Fundação (Auth + Base)
**Meta:** permitir login real e estrutura mínima de dados.
- Definir autenticação (Auth.js Credentials + bcrypt + MongoDB).
- Criar coleções Users e Devices com índices básicos.
- Criar rotas de API iniciais (login, logout, session).
- Ajustar login UI para conectar na autenticação real.

**Entregáveis:**
- Login funcional.
- Usuário autenticado com sessão válida.
- Users + Devices no MongoDB.

## Fase 2 - Pareamento e Inventário
**Meta:** vincular dispositivos ao usuário via QR.
- Rota de pareamento: /pair?serialId=...
- Fluxo de confirmação de vínculo e permissão de GPS.
- Atualizar Devices com ownerId, nickname, localização.

**Entregáveis:**
- Pareamento com QR funcionando.
- Lista de dispositivos por usuário.

## Fase 3 - Telemetria Básica
**Meta:** ingestão de dados e exibição do status vivo.
- Ingestao via MQTT (consumer -> MongoDB).
- Atualizar Devices.last_sync e status.
- Mostrar status vivo + última voltagem/eficiência.

**Entregáveis:**
- Status vivo confiável.
- Indicadores basicos em tempo real.

## Fase 4 - Histórico e Gráficos
**Meta:** análise histórica de eficiência.
- Colecao Telemetry time-series.
- Queries por período (dia, semana, mês).
- Gráficos interativos no dashboard.

**Entregáveis:**
- Histórico funcional.
- Filtros por período.

## Fase 5 - Multidispositivo
**Meta:** alternar rápido entre unidades instaladas.
- Seletor rapido de dispositivo.
- Persistência da seleção.
- Otimização das consultas por device.

**Entregáveis:**
- Gestão multidispositivo completa.

## Fase 6 - Robustez e Escala
-**Meta:** estabilidade e eficiência.
- Política de retenção (1 ano) + rollups diárias.
- Monitoramento de erros e alertas.
- Hardening de segurança (rate limit, validação).

**Entregáveis:**
- Plataforma pronta para uso real.

## Decisões Tomadas
- Broker MQTT: self-hosted (sem custo inicial).
- Retenção de dados: 1 ano no MongoDB free (1 dispositivo no início).
- Status: desligado após 40+ minutos sem logs.
- Identificação do device: serialId + token.
