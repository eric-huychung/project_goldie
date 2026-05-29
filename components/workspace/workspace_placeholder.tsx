/**
 * Placeholder panel for workspace tabs not yet implemented (Phases 2b–4).
 */

type workspace_placeholder_props = {
  title: string;
  phase_label: string;
};

/**
 * @param props - Tab title and phase note
 */
export function WorkspacePlaceholder({
  title,
  phase_label,
}: workspace_placeholder_props) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-[#1f2937] mb-2">{title}</h1>
        <p className="text-muted-foreground text-sm">{phase_label}</p>
      </div>
    </div>
  );
}
