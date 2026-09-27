$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distDirectory = Join-Path $projectRoot 'dist'
$assetSource = Join-Path $projectRoot 'assets'
$assetDestination = Join-Path $distDirectory 'assets'

$publicFiles = @(
  'index.html',
  'blogs.html',
  'styles.css',
  'fullscreen.css',
  'refinements.css',
  'blog-page.css',
  'app.js',
  'content.js',
  'preloader.js',
  'blog-page.js',
  'blog-posts.js'
)

New-Item -ItemType Directory -Force -Path $distDirectory | Out-Null
foreach ($file in $publicFiles) {
  $source = Join-Path $projectRoot $file
  if (Test-Path -LiteralPath $source) {
    Copy-Item -LiteralPath $source -Destination (Join-Path $distDirectory $file) -Force
  }
}

if (Test-Path -LiteralPath $assetSource) {
  New-Item -ItemType Directory -Force -Path $assetDestination | Out-Null
  Copy-Item -Path (Join-Path $assetSource '*') -Destination $assetDestination -Recurse -Force
}

Write-Host 'Public root files are synchronized to dist.'
