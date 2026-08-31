import {
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import {
    type ComponentProps,
    useEffect,
    useRef,
    useState,
} from "react";
import { PhotoSlider } from "react-photo-view";

interface ContentImageLightboxProps {
    groupSelectors: string[];
}

type SliderImage = ComponentProps<typeof PhotoSlider>["images"][number];
type OverlayProps = Parameters<
    NonNullable<ComponentProps<typeof PhotoSlider>["overlayRender"]>
>[0];

interface ContentSlide extends SliderImage {
    altText: string;
    caption: string;
}

interface ImageAttributeSnapshot {
    image: HTMLImageElement;
    tabIndex: string | null;
    role: string | null;
    ariaLabel: string | null;
    ariaHasPopup: string | null;
    groupIndex: string | null;
    imageIndex: string | null;
}

const GROUP_ATTRIBUTE = "data-content-lightbox-group";
const INDEX_ATTRIBUTE = "data-content-lightbox-index";
const TRIGGER_CLASS = "content-image-lightbox-trigger";
const PORTAL_SELECTOR = ".content-image-lightbox";

function restoreAttribute(element: Element, name: string, value: string | null) {
    if (value === null) {
        element.removeAttribute(name);
        return;
    }

    element.setAttribute(name, value);
}

function getCaption(image: HTMLImageElement) {
    const figureCaption = image
        .closest("figure")
        ?.querySelector("figcaption")
        ?.textContent?.trim();

    return figureCaption || image.alt.trim();
}

function LightboxOverlay({
    images,
    index,
    onIndexChange,
    onClose,
    scale,
    onScale,
}: OverlayProps) {
    const current = images[index] as ContentSlide | undefined;
    const canGoPrevious = index > 0;
    const canGoNext = index < images.length - 1;
    const canZoomOut = scale > 1;
    const canZoomIn = scale < 6;
    const iconButtonClass =
        "size-10 shrink-0 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-35";

    return (
        <div
            className="pointer-events-none absolute inset-0 z-30 text-white"
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
        >
            <div className="pointer-events-auto absolute inset-x-0 top-0 flex h-14 items-center justify-between bg-black/55 px-3">
                <span
                    className="min-w-14 font-mono text-sm text-white/80"
                    aria-live="polite"
                >
                    {index + 1} / {images.length}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className={`${iconButtonClass} inline-flex`}
                        onClick={() => onScale(Math.max(1, scale - 0.5))}
                        disabled={!canZoomOut}
                        aria-label="缩小图片"
                        title="缩小"
                    >
                        <ZoomOut className="size-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={`${iconButtonClass} inline-flex`}
                        onClick={() => onScale(Math.min(6, scale + 0.5))}
                        disabled={!canZoomIn}
                        aria-label="放大图片"
                        title="放大"
                    >
                        <ZoomIn className="size-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={`${iconButtonClass} inline-flex`}
                        onClick={() => onClose()}
                        aria-label="关闭图片预览"
                        title="关闭"
                        data-lightbox-close
                    >
                        <X className="size-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className={`${iconButtonClass} pointer-events-auto absolute left-3 top-1/2 hidden -translate-y-1/2 bg-black/45 md:inline-flex`}
                        onClick={() => onIndexChange(index - 1)}
                        disabled={!canGoPrevious}
                        aria-label="查看上一张图片"
                        title="上一张"
                    >
                        <ChevronLeft className="size-6" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={`${iconButtonClass} pointer-events-auto absolute right-3 top-1/2 hidden -translate-y-1/2 bg-black/45 md:inline-flex`}
                        onClick={() => onIndexChange(index + 1)}
                        disabled={!canGoNext}
                        aria-label="查看下一张图片"
                        title="下一张"
                    >
                        <ChevronRight className="size-6" aria-hidden="true" />
                    </button>
                </>
            )}

            {current?.caption && (
                <p className="absolute bottom-4 left-1/2 max-w-[min(90vw,42rem)] -translate-x-1/2 rounded-sm bg-black/65 px-3 py-2 text-center text-sm leading-6 text-white">
                    {current.caption}
                </p>
            )}
        </div>
    );
}

export default function ContentImageLightbox({
    groupSelectors,
}: ContentImageLightboxProps) {
    const [slides, setSlides] = useState<ContentSlide[]>([]);
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const groupsRef = useRef<ContentSlide[][]>([]);
    const lastTriggerRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const snapshots: ImageAttributeSnapshot[] = [];
        const roots: Element[] = [];

        groupsRef.current = groupSelectors.map((selector, groupIndex) => {
            const root = document.querySelector(selector);
            if (!root) {
                return [];
            }

            roots.push(root);
            const images =
                root instanceof HTMLImageElement
                    ? [root]
                    : Array.from(root.querySelectorAll<HTMLImageElement>("img"));

            return images
                .filter((image) => !image.closest("[data-no-lightbox]"))
                .map((image, imageIndex) => {
                    snapshots.push({
                        image,
                        tabIndex: image.getAttribute("tabindex"),
                        role: image.getAttribute("role"),
                        ariaLabel: image.getAttribute("aria-label"),
                        ariaHasPopup: image.getAttribute("aria-haspopup"),
                        groupIndex: image.getAttribute(GROUP_ATTRIBUTE),
                        imageIndex: image.getAttribute(INDEX_ATTRIBUTE),
                    });

                    const caption = getCaption(image);
                    const altText =
                        image.alt.trim() ||
                        caption ||
                        `第 ${imageIndex + 1} 张图片`;
                    const src = image.currentSrc || image.src;

                    image.classList.add(TRIGGER_CLASS);
                    image.setAttribute("tabindex", "0");
                    image.setAttribute("role", "button");
                    image.setAttribute("aria-haspopup", "dialog");
                    image.setAttribute(
                        "aria-label",
                        caption
                            ? `放大查看：${caption}`
                            : `放大查看第 ${imageIndex + 1} 张图片`,
                    );
                    image.setAttribute(GROUP_ATTRIBUTE, String(groupIndex));
                    image.setAttribute(INDEX_ATTRIBUTE, String(imageIndex));

                    return {
                        key: `${groupIndex}-${imageIndex}-${src}`,
                        src,
                        altText,
                        caption,
                        originRef: {
                            current: image as HTMLElement | null,
                        },
                    };
                });
        });

        const openFromImage = (image: HTMLImageElement) => {
            const groupIndex = Number(image.getAttribute(GROUP_ATTRIBUTE));
            const imageIndex = Number(image.getAttribute(INDEX_ATTRIBUTE));
            const group = groupsRef.current[groupIndex];

            if (!group?.[imageIndex]) {
                return;
            }

            lastTriggerRef.current = image;
            setSlides(group);
            setIndex(imageIndex);
            setVisible(true);
        };

        const handleClick = (event: Event) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            const image = event.target.closest<HTMLImageElement>(
                `img[${GROUP_ATTRIBUTE}][${INDEX_ATTRIBUTE}]`,
            );
            if (!image) {
                return;
            }

            event.preventDefault();
            openFromImage(image);
        };

        const handleKeyDown = (event: Event) => {
            if (!(event instanceof KeyboardEvent)) {
                return;
            }
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }
            if (!(event.target instanceof HTMLImageElement)) {
                return;
            }
            if (
                !event.target.hasAttribute(GROUP_ATTRIBUTE) ||
                !event.target.hasAttribute(INDEX_ATTRIBUTE)
            ) {
                return;
            }

            event.preventDefault();
            openFromImage(event.target);
        };

        roots.forEach((root) => {
            root.addEventListener("click", handleClick);
            root.addEventListener("keydown", handleKeyDown);
        });

        return () => {
            roots.forEach((root) => {
                root.removeEventListener("click", handleClick);
                root.removeEventListener("keydown", handleKeyDown);
            });
            snapshots.forEach((snapshot) => {
                snapshot.image.classList.remove(TRIGGER_CLASS);
                restoreAttribute(snapshot.image, "tabindex", snapshot.tabIndex);
                restoreAttribute(snapshot.image, "role", snapshot.role);
                restoreAttribute(
                    snapshot.image,
                    "aria-label",
                    snapshot.ariaLabel,
                );
                restoreAttribute(
                    snapshot.image,
                    "aria-haspopup",
                    snapshot.ariaHasPopup,
                );
                restoreAttribute(
                    snapshot.image,
                    GROUP_ATTRIBUTE,
                    snapshot.groupIndex,
                );
                restoreAttribute(
                    snapshot.image,
                    INDEX_ATTRIBUTE,
                    snapshot.imageIndex,
                );
            });
            groupsRef.current = [];
        };
    }, [groupSelectors]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        const frame = requestAnimationFrame(() => {
            const portal = document.querySelector<HTMLElement>(PORTAL_SELECTOR);
            if (!portal) {
                return;
            }

            portal.setAttribute("aria-modal", "true");
            portal.setAttribute("aria-label", "图片预览");
            portal
                .querySelector<HTMLButtonElement>("[data-lightbox-close]")
                ?.focus();
        });

        const trapFocus = (event: KeyboardEvent) => {
            if (event.key !== "Tab") {
                return;
            }

            const portal = document.querySelector<HTMLElement>(PORTAL_SELECTOR);
            const focusable = portal
                ? Array.from(
                      portal.querySelectorAll<HTMLElement>(
                          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
                      ),
                  ).filter(
                      (element) =>
                          !element.hasAttribute("disabled") &&
                          element.getClientRects().length > 0,
                  )
                : [];

            if (!portal || focusable.length === 0) {
                return;
            }

            const currentIndex = focusable.indexOf(
                document.activeElement as HTMLElement,
            );
            const nextIndex = event.shiftKey
                ? currentIndex <= 0
                    ? focusable.length - 1
                    : currentIndex - 1
                : currentIndex === focusable.length - 1
                  ? 0
                  : currentIndex + 1;

            event.preventDefault();
            focusable[nextIndex]?.focus();
        };

        document.addEventListener("keydown", trapFocus);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("keydown", trapFocus);
        };
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        let observer: MutationObserver | null = null;

        const syncPhotoAltText = () => {
            const photos = document.querySelectorAll<HTMLImageElement>(
                `${PORTAL_SELECTOR} .content-image-lightbox-photo`,
            );

            photos.forEach((photo) => {
                const src = photo.currentSrc || photo.src;
                const slide =
                    slides.find((candidate) => candidate.src === src) ??
                    slides[index];
                if (slide && photo.alt !== slide.altText) {
                    photo.alt = slide.altText;
                }
            });
        };

        const frame = requestAnimationFrame(() => {
            const portal = document.querySelector<HTMLElement>(PORTAL_SELECTOR);
            if (!portal) {
                return;
            }

            syncPhotoAltText();
            observer = new MutationObserver(syncPhotoAltText);
            observer.observe(portal, {
                attributes: true,
                attributeFilter: ["alt", "src"],
                childList: true,
                subtree: true,
            });
        });

        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
        };
    }, [index, slides, visible]);

    return (
        <PhotoSlider
            images={slides}
            visible={visible && slides.length > 0}
            index={index}
            onIndexChange={setIndex}
            onClose={() => setVisible(false)}
            afterClose={() => {
                const trigger = lastTriggerRef.current;
                lastTriggerRef.current = null;
                if (trigger?.isConnected) {
                    trigger.focus({ preventScroll: true });
                }
            }}
            loop={false}
            maskOpacity={0.1}
            bannerVisible={false}
            photoClosable={false}
            className="content-image-lightbox"
            photoClassName="content-image-lightbox-photo"
            overlayRender={(props) => <LightboxOverlay {...props} />}
        />
    );
}
