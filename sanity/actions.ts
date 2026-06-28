import { EyeOpenIcon } from '@sanity/icons';
import {
  useCurrentUser,
  useDocumentOperation,
  type DocumentActionComponent,
  type SlugValue,
} from 'sanity';

/**
 * Action « Voir sur le site » dans l'éditeur d'un article : ouvre la page
 * publique correspondante dans un nouvel onglet (origine courante : localhost
 * en dev, domaine de production en ligne). N'apparaît que si un slug existe.
 */
export const viewOnSiteAction: DocumentActionComponent = (props) => {
  const doc = (props.draft ?? props.published) as
    | { slug?: SlugValue }
    | null;
  const slug = doc?.slug?.current;
  if (!slug) return null;

  return {
    label: 'Voir sur le site',
    icon: EyeOpenIcon,
    onHandle: () => {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      window.open(
        `${origin}/actualites/${slug}`,
        '_blank',
        'noopener,noreferrer'
      );
    },
  };
};

/**
 * Enveloppe l'action « Publier » par défaut pour estampiller automatiquement,
 * au moment de la publication, l'utilisateur du Studio qui a mis le document à
 * jour (`uploadedBy`) ainsi que la date (`uploadedAt`). Utilisé pour le héro
 * d'accueil, afin de tracer qui a importé le diaporama ou la vidéo.
 */
export function withUploaderStamp(
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent {
  const StampedPublish: DocumentActionComponent = (props) => {
    const { patch } = useDocumentOperation(props.id, props.type);
    const user = useCurrentUser();
    const original = originalPublishAction(props);
    if (!original) return original;

    return {
      ...original,
      onHandle: () => {
        patch.execute([
          {
            set: {
              uploadedBy: user?.name || user?.email || 'Inconnu',
              uploadedAt: new Date().toISOString(),
            },
          },
        ]);
        original.onHandle?.();
      },
    };
  };
  return StampedPublish;
}
