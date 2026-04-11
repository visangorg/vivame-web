$path = "c:\Users\user\OneDrive\Documents\GitHub\vivame-web\js\main.js"
$s = [System.IO.File]::ReadAllText($path)
$marker = "var CLUB_PORTAL_CLUBS = ["
$tail = "`r`n];`r`n`r`nfunction escapeHtmlText"
$i0 = $s.IndexOf($marker)
if ($i0 -lt 0) { throw "marker" }
$i1 = $s.IndexOf($tail, $i0)
if ($i1 -lt 0) { throw "tail" }
$inner = $s.Substring($i0 + $marker.Length, $i1 - ($i0 + $marker.Length))
$sep = "`r`n  },`r`n  {"
$parts = $inner.Split([string[]]@($sep), [System.StringSplitOptions]::None)
if ($parts.Count -ne 15) { throw "expected 15 got $($parts.Count)" }
$blocks = @()
for ($i = 0; $i -lt 15; $i++) {
  if ($i -lt 14) { $blocks += $parts[$i] + $sep }
  else { $blocks += $parts[$i] }
}
$byName = @{}
foreach ($b in $blocks) {
  if ($b -match 'name:\s*"([^"]+)"') {
    $byName[$matches[1]] = $b
  } else { throw "no name" }
}
$order = @(
  "그립",
  "포시즌스",
  "비상턴",
  "모종의 시작",
  "그림책 놀이터",
  "퐁당다이브클럽",
  "팝케팅",
  "Focus on",
  "원모어 (One More)",
  "비상다독",
  "다람지",
  "비상골린이들",
  "온니 플라워",
  "떼구르",
  "AVOCADO"
)
$newInner = ""
foreach ($n in $order) {
  if (-not $byName.ContainsKey($n)) { throw "missing $n" }
  $newInner += $byName[$n]
}
$head = $s.Substring(0, $i0 + $marker.Length)
$rest = $s.Substring($i1)
$newS = $head + $newInner + $rest
[System.IO.File]::WriteAllText($path, $newS, [System.Text.UTF8Encoding]::new($false))
Write-Host "OK"
