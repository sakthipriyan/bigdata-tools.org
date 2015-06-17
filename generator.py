import logging, sys, os, shutil, re

logger = logging.getLogger(__name__)
SRC = 'src'
DIST = 'dist'

def copy_resources(src, dist):
	resources = ['css','fonts','img','js']
	shutil.rmtree(dist,True)
	for resource in resources:
		shutil.copytree('%s/web/%s' % (src,resource), '%s/%s' % (dist,resource))

def process_src(src, dist):
	for root, dirs, files in os.walk(src):
		for name in files:
			if (name.endswith('.md')):
				in_path = os.path.join(root, name)
				out_path = in_path.replace(src,dist)[:-3] + '.html'
				process_md(in_path, out_path)
			else:
				in_path = os.path.join(root, name)
				out_path = in_path.replace(src,dist)
				shutil.copyfile(in_path, out_path)
		for name in dirs:
			in_path = os.path.join(root, name)
			out_path = in_path.replace(src,dist)
			os.makedirs(out_path)

def process_md(src, dist):
	with open(src) as md_file:
		content = md_file.readlines()
		if(len(content) > 0):
			logger.warn('File %s contains less than 4 lines, skipping' % src)
		html_content = get_html(content)
		write_file(dist,html_content)


def write_file(filename, content):
	logger.debug('Writing content to file ' + filename)
	with open(filename, "w") as f:
		f.write(content)
		f.close()

def get_html(content):
	title = re.sub('^#','',content[0].strip())
	sub_title = re.sub('^##','',content[1].strip())
	img_md = content[2]
	img_url = img_md[img_md.index('(')+1, img_md.rindex(')')]
	md = ''.join(content[3:])
	return markdown.markdown(md)

def main():
	logging.basicConfig(level=logging.DEBUG,format='%(asctime)-15s %(levelname)-5s %(name)-8s %(message)s')
	dist = os.path.join(os.getcwd(),DIST)
	src = os.path.join(os.getcwd(),SRC)
	logger.info('Generating website in ' + dist +' from source ' + src)
	copy_resources(os.getcwd(), dist)
	process_src(src, dist)

if __name__ == '__main__' :
	main()
