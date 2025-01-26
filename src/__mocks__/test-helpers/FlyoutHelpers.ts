export function createDivForFlyoutPortal(): void {
    const portalContainer = document.createElement('div');
    portalContainer.id = 'pr_ui_svc_layout';
    if (!document.getElementById(portalContainer.id)) {
        document.body.appendChild(portalContainer);
    }
}
