# Client configuration examples

The endpoint is the same everywhere: `https://www.cnslookup.com/mcp` (Streamable HTTP, no auth).

## Claude Code
```bash
claude mcp add --transport http web3-dns https://www.cnslookup.com/mcp
```

## Claude Desktop

`claude_desktop_config.json`. If your version cannot add remote servers directly, add the server as a custom connector under Settings → Connectors, or use `mcp-remote`:
```json
{
  "mcpServers": {
    "web3-dns": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://www.cnslookup.com/mcp"]
    }
  }
}
```

## Cursor

`.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "web3-dns": { "url": "https://www.cnslookup.com/mcp" }
  }
}
```

## VS Code

`.vscode/mcp.json`:
```json
{
  "servers": {
    "web3-dns": { "type": "http", "url": "https://www.cnslookup.com/mcp" }
  }
}
```

## Windsurf

`~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "web3-dns": { "serverUrl": "https://www.cnslookup.com/mcp" }
  }
}
```

## Raw JSON-RPC
```bash
curl -s https://www.cnslookup.com/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_payment_address","arguments":{"to":"example.com","network":"BASE"}}}'
```
