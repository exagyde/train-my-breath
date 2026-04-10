const STYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "24px",
    fontWeight: "700"
}

export default function NotFoundPage() {
    return (
        <div style={STYLE}>
            <p>404 not found</p>
        </div>
    );
}