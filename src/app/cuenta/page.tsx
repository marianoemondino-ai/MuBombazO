import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAccountCharacters } from "@/lib/auth";
import { getClassIcon, getClassName } from "@/lib/mu-classes";
import { logoutAction } from "@/app/login/actions";

export const metadata = { title: "Mi Cuenta | MuBombazo" };
export const dynamic = "force-dynamic";

export default async function CuentaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const characters = await getAccountCharacters(session.accountId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Mi Cuenta</h1>
          <p className="mt-1 text-muted">{session.accountId}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-danger hover:text-danger"
          >
            Cerrar Sesion
          </button>
        </form>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Personajes</h2>
      {characters.length === 0 ? (
        <p className="glow-border mt-4 rounded-lg p-6 text-center text-sm text-muted">
          Todavia no creaste personajes. Entra al juego para crear el primero.
        </p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {characters.map((c) => (
            <div key={c.Name} className="glow-border flex gap-4 rounded-lg p-5">
              {getClassIcon(c.Class) && (
                <Image
                  src={getClassIcon(c.Class)!}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded"
                />
              )}
              <div>
                <p className="font-display font-semibold">{c.Name}</p>
                <p className="mt-1 text-sm text-muted">{getClassName(c.Class)}</p>
                <div className="mt-3 flex gap-4 text-xs text-muted">
                  <span>Nivel {c.cLevel}</span>
                  <span>Reset {c.ResetCount}</span>
                  <span>Master Reset {c.MasterResetCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
