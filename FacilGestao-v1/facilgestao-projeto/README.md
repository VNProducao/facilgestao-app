# FacilGestão 🏢

Sistema de gestão comercial SaaS para pequenos negócios.

## Como rodar localmente

```bash
npm install
npm run dev
```

## Como subir no Vercel

1. Faça push para o GitHub:
```bash
git init
git add .
git commit -m "feat: FacilGestão v1.0"
git remote add origin https://github.com/SEU_USER/facilgestao.git
git push -u origin main
```

2. Acesse vercel.com → Import Git Repository → selecione o repo
3. Framework: **Vite** (detectado automaticamente)
4. Clique em **Deploy** — pronto!

## Acessos demo

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Administrador da plataforma | qualquer@email.com | qualquer |
| Gestor do negócio | qualquer@email.com | qualquer |

Selecione o tipo de acesso na tela de login.

## Módulos

- **Dashboard** — KPIs, alertas de estoque, pedidos recentes
- **Pedidos** — CRUD completo, desconto automático de estoque
- **Estoque de Produtos** — Produtos finais vendáveis, entradas manuais
- **Clientes** — Cadastro, histórico, ticket médio
- **Financeiro** — Filtros de data, lançamentos, lucro por produto
- **Relatórios** — Mais vendidos, lucro, top clientes, estoque crítico
- **Configurações** — Dados do negócio

## Mudanças da versão

- ✅ Renomeado de DoceGestão → FacilGestão
- ✅ Módulo Receitas removido completamente
- ✅ Estoque gerencia produtos finais (não ingredientes)
- ✅ Pedidos deduzem estoque do produto diretamente
- ✅ Custo calculado por produto (costUnit × qty)
- ✅ Campos: nome, categoria, unidade, custo, preço de venda, margem, status
