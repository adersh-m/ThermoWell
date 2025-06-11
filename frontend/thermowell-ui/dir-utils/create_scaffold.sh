SRC_DIR="src"
COMPONENTS_DIR="$SRC_DIR/components"
PAGES_DIR="$SRC_DIR/pages"

# Create component directories and files
declare -A COMPONENT_DIRS=(
  ["$COMPONENTS_DIR/layout"]="Layout Sidebar Header PageHeader"
  ["$COMPONENTS_DIR/ui"]="Button Card Input Select Toggle Table TableHeader TableRow Gauge"
  ["$COMPONENTS_DIR/dashboard"]="WarningLevelsCard AdvisoryOverviewCard MonitoredRegionsCard LatestAdvisoriesTable LocationStatusTable"
  ["$COMPONENTS_DIR/advisories"]="AdvisoriesStatsCards AdvisoriesTable"
  ["$COMPONENTS_DIR/alerts"]="AlertList"
  ["$COMPONENTS_DIR/tips"]="TipList TipDetail"
  ["$COMPONENTS_DIR/resources"]="ResourceCardGrid"
  ["$COMPONENTS_DIR/health"]="HealthScoreForm"
  ["$COMPONENTS_DIR/settings"]="SettingsOverview ProfileForm NotificationPreferences SecuritySettings PreferencesSettings"
  ["$COMPONENTS_DIR/auth"]="LoginForm RegisterForm"
)

for dir in "${!COMPONENT_DIRS[@]}"; do
  mkdir -p "$dir"
  for comp in ${COMPONENT_DIRS[$dir]}; do
    file="$dir/$comp.tsx"
    if [ ! -f "$file" ]; then
      touch "$file"
      echo "Created $file"
    else
      echo "Skipped (exists) $file"
    fi
  done
done

# Create page directories and files
mkdir -p "$PAGES_DIR/auth"
declare -a PAGE_FILES=(
  "HomePage"
  "DashboardPage"
  "AdvisoriesPage"
  "AlertsPage"
  "TipsPage"
  "TipDetailPage"
  "ResourcesPage"
  "HealthScorePage"
  "SettingsPage"
)
for page in "${PAGE_FILES[@]}"; do
  file="$PAGES_DIR/$page.tsx"
  if [ ! -f "$file" ]; then
    touch "$file"
    echo "Created $file"
  else
    echo "Skipped (exists) $file"
  fi
done

# Auth pages
for authPage in LoginPage RegisterPage; do
  file="$PAGES_DIR/auth/$authPage.tsx"
  if [ ! -f "$file" ]; then
    touch "$file"
    echo "Created $file"
  else
    echo "Skipped (exists) $file"
  fi
done

echo "Scaffolding complete."
EOF